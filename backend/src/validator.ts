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

    /*if(!req.body.machine) {
        return errorHandler(res, 400, "A machine must be given!");
    }*/

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

    if(!workingStatus(req.body.status) && req.body.works.length > 1) {
        return errorHandler(res, 400, "Can't add person to work!");
    }

    next();
}

export function updateWorkerValidator(req, res, next) {
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

    if(onLeaveStatus(req.body.status) && req.body.works.length > 1) {
        return errorHandler(res, 400, "Can't add person to work!");
    }

    next();
}

function validStatus(status : string) {
    console.log(status);
    return Object.values(Status).filter(value => value === status).length > 0;
}

function onLeaveStatus(status : Status | string) {
    return status === Status.ON_LEAVE;
}

function workingStatus(status : Status | string) {
    return status === Status.WORKING;
}

function errorHandler(res, status = 500, message : any = 'Server error!') {
    console.error(message);
    res.status(status).json({ message });
}