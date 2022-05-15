import { getRepository } from "typeorm";
import { Machine } from "../entity/Machine";
import { Task } from "../entity/Task";
import { Work } from "../entity/Work";
import { Controller } from "./base.controller";

export class TaskController extends Controller {
    repository = getRepository(Task);
    machineRepository = getRepository(Machine);
    workRepository = getRepository(Work);

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find({relations: ["machine","work"]});
            res.json(entities);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }

    addMachine = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }

        const machineId = parseInt(req.query.machineId);
        if(isNaN(machineId)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        try {
            const task = await this.repository.findOne(id);
            if(!task) {
                return this.errorHandler(res, 404, "Task not found!")
            }

            const machine = await this.repository.findOne(machineId);
            if(!machine) {
                return this.errorHandler(res, 404, "Machine not found!")
            }

            await this.repository.update(id, {
                machine: machine
            })
            res.json({message: "Machine is added to the task!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }

    deleteMachine = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }

        try {
            const task = await this.repository.findOne(id);
            if(!task) {
                return this.errorHandler(res, 404, "Task not found!")
            }

            await this.repository.update(id, {
                machine: null
            })
            res.json({message: "Machine is added to the task!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }
    
    addWork = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }

        const workId = parseInt(req.query.workId);
        if(isNaN(workId)) {
            return this.errorHandler(res, 400, "Query parameter must be a number!");
        }

        try {
            const task = await this.repository.findOne(id);
            if(!task) {
                return this.errorHandler(res, 404, "Work not found!")
            }
            if(task.work) {
                return this.errorHandler(res, 400, "Task is already added to a work!")
            }

            const work = await this.workRepository.findOne(workId);
            if(!work) {
                return this.errorHandler(res, 404, "Task not found!")
            }

            await this.repository.update(id, {
                work: work
            })
            res.json({message: "Task is added to the work!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }

    deleteWork = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }

        try {
            const task = await this.repository.findOne(id);
            if(!task) {
                return this.errorHandler(res, 404, "Work not found!")
            }

            await this.repository.update(id, {
                work: null
            })
            res.json({message: "Task is added to the work!"});
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }
}