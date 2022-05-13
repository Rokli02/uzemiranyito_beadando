import { getRepository } from "typeorm";
import { Machine } from "../entity/Machine";
import { Controller } from "./base.controller";

export class MachineController extends Controller {
    repository = getRepository(Machine);

    getOneOccupancy = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            this.errorHandler(res, 400, "Id parameter must be a number!")
        }

        try {
            const entity = await this.repository.findOne(id);
            if(!entity) {
                return this.errorHandler(res, 404, "There is no machine with such id!");
            }

            const numOfTasks = entity.tasks.length;
            const occupancy = (numOfTasks / entity.maxNumOfTasks).toFixed(4);

            res.json(occupancy);
        } catch(err) {
            return this.errorHandler(res, 500, err);
        }
    }

    getAllFree = async (req, res) => {
        try {
            const machines = await this.repository.find();
            const freeMachines = machines.filter(value => value.maxNumOfTasks > value.tasks.length);
            res.json(freeMachines);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }
}