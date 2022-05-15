import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const entity = this.repository.create(req.body);
        if(entity.id) {
            entity.id = null;
        }

        try {
            const entityAdded = await this.repository.save(entity);
            res.status(201).json(entityAdded);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            
            const entity = await this.repository.findOne(id);
            if (!entity) {
                return this.errorHandler(res, 404, 'No entity found!');
            }

            res.json(entity);
        } catch (err) {
            this.errorHandler(res, 500, err);
        }
    }

    delete = async (req, res) => {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return this.errorHandler(res, 400, "Id parameter must be a number!");
        }
        try {
            const entity = await this.repository.findOne(id);
            if (!entity) {
                return this.errorHandler(res, 404, "Entity not found!");
            }

            await this.repository.delete(entity.id);
            res.json({message: `Entity with id: ${id} is deleted!`, entity: entity});
        } catch (err) {
            return this.errorHandler(res, 500, err);
        }
    }
    
    errorHandler(res, status = 500, message : any = 'Server error!') {
        console.error(message);
        res.status(status).json({ message });
    }
}
