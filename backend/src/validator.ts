import { Status } from "./entity/Worker";

export function addWorkValidator(req, res, next) {
    if(!req.body.name) {
        return errorHandler(res, 400, "Name is required!");
    }

    if(req.body.tasks.length < 1) {
        return errorHandler(res, 400, "Tasks are required!");
    }

    next();
}

export function addTaskValidator(req, res, next) {
    if(!req.body.name) {
        return errorHandler(res, 400, "Name is required!");
    }

    if(!req.body.machine) {
        return errorHandler(res, 400, "A machine must be given!");
    }

    next();
}

export function addMachineValidator(req, res, next) {
    if(!req.body.type) {
        return errorHandler(res, 400, "Type is required!");
    }

    if(isNaN(req.body.maxNumOfTasks) || req.body.maxNumOfTasks < 1) {
        return errorHandler(res, 400, "Max number of tasks must be a number and at least 1!")
    }

    next();
}

export function addWorkerValidator(req, res, next) {
    if(!req.body.name) {
        return errorHandler(res, 400, "Name is required!");
    }
    
    if(!req.body.qualification) {
        return errorHandler(res, 400, "Qualification is required!");
    }
    
    if(isNaN(req.body.salary) || req.body.salary < 0) {
        return errorHandler(res, 400, "Salary must be a number and at least 0!");
    }

    if(!validStatus(req.body.status)) {
        return errorHandler(res, 400, "Not valid status is given!");
    }

    if(!freeStatus && req.body.works.length > 1) {
        return errorHandler(res, 400, "Can't add person to work!");
    }

    next();
}

function validStatus(status : Status | string) {
    for(const stat in Status) {
        if(stat === status)
            return true;
        console.log("Stat in for:",stat);
        console.log("Status from param:",status);
    }
    return false;
}

function freeStatus(status : Status | string) {
    return status === Status.FREE;
}

function errorHandler(res, status = 500, message : any = 'Server error!') {
    console.error(message);
    res.status(status).json({ message });
}