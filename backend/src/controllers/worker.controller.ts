import { getRepository } from "typeorm";
import { Work } from "../entity/Work";
import { Status, Worker } from "../entity/Worker";
import { Controller } from "./base.controller";

export class WorkerController extends Controller {
    repository = getRepository(Worker);
    workRepository = getRepository(Work);

    addWork = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        const workId = parseInt(req.query.workId);
        if(isNaN(workId)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        try {
            const worker = await this.repository.findOne(id);
            if(!worker) {
                return this.errorHandler(res, 404, "Couldn't find worker with such id!");
            }
            
            const work = await this.workRepository.findOne(workId);
            if(!work) {
                return this.errorHandler(res, 404, "Couldn't find work with such id!");
            }

            if(worker.status !== Status.FREE) {
                return this.errorHandler(res, 400, "The worker is not free currently!")
            }

            for(const wrk of worker.works) {
                if(wrk.id == work.id) {
                    return this.errorHandler(res, 400, "Worker is already working on this work!");
                }
            }

            worker.works = [...worker.works, work];
            worker.status = Status.WORKING;

            await this.repository.save(worker);
            res.json({message: "New work is added to the worker!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }

    deleteWork = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        const workId = parseInt(req.query.workId);
        if(isNaN(workId)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        try {
            const worker = await this.repository.findOne(id);
            if(!worker) {
                return this.errorHandler(res, 404, "Couldn't find worker with such id!");
            }

            const work = await this.workRepository.findOne(workId);
            if(!work) {
                return this.errorHandler(res, 404, "Couldn't find work with such id!");
            }

            worker.works = worker.works.filter(value => value.id !== work.id);
            if(worker.works.length < 1) {
                worker.status = Status.FREE;
            }

            await this.repository.save(worker);
            res.json({message: "Work id deleted from the worker!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }

    getAllFree = async (req, res) => {
        try {
            const entities = await this.repository.find({where : {
                status: Status.FREE
            }});
            res.json(entities);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }

    update = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }
        
        const entity = this.repository.create(req.body as Worker);
        entity.id = id;
        if(entity.status === Status.FREE && entity.works.length > 0) {
            entity.status = Status.WORKING
        }
        
        try {
            const entityOfDb = await this.repository.findOne(id);
            if(!entityOfDb) {
                return this.errorHandler(res, 404, "Entity not found!")
            }

            const entityAdded = await this.repository.save(entity);
            res.status(200).json(entityAdded);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }
}