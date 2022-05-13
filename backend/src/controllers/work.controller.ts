import { getRepository } from "typeorm";
import { Task } from "../entity/Task";
import { Work } from "../entity/Work";
import { Controller } from "./base.controller";

export class WorkController extends Controller {
    repository = getRepository(Work);

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find({relations: ["workers"]});
            res.json(entities);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }
}