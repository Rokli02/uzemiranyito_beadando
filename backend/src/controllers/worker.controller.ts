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

            if(worker.status !== Status.FREE) {
                return this.errorHandler(res, 400, "The worker is not free currently!")
            }

            const work = await this.workRepository.findOne(workId);
            if(!work) {
                return this.errorHandler(res, 404, "Couldn't find work with such id!");
            }

            for(const wrk of worker.works) {
                if(wrk.id == work.id) {
                    return this.errorHandler(res, 400, "Worker is already working on this work!");
                }
            }

            let workerWorks = [...worker.works, work]

            await this.repository.update(id, {
                works: workerWorks
            });
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

            if(worker.status !== Status.FREE) {
                return this.errorHandler(res, 400, "The worker is not free currently!")
            }

            const work = await this.workRepository.findOne(workId);
            if(!work) {
                return this.errorHandler(res, 404, "Couldn't find work with such id!");
            }

            let workerWorks = worker.works.filter(value => value.id !== work.id);

            await this.repository.update(id, {
                works: workerWorks
            });
            res.json({message: "New work is added to the worker!"});
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
}