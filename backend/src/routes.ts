import * as express from "express";
import { MachineController } from "./controllers/machine.controller";
import { TaskController } from "./controllers/task.controller";
import { WorkController } from "./controllers/work.controller";
import { WorkerController } from "./controllers/worker.controller";
import { addMachineValidator, addTaskValidator, addWorkerValidator, addWorkValidator, updateWorkerValidator } from "./validator";

export function getRoutes() {
    const router = express.Router();
    router.get("/api", (req, res) => {
        res.send('<h1 style="margin: 5em auto">Root of express server!</h1>');
    })

    //FELADATOK
    const taskController = new TaskController();
    router.get("/api/task", taskController.getAll);
    router.post("/api/task", addTaskValidator, taskController.create);
    router.put("/api/task/machine/add/:id", taskController.addMachine);
    router.put("/api/task/machine/delete/:id", taskController.deleteMachine);
    router.put("/api/task/work/add/:id", taskController.addWork);
    router.put("/api/task/work/delete/:id", taskController.deleteWork);
    router.delete("/api/task/:id", taskController.delete);

    //GÉPEK
    const machineController = new MachineController();
    router.get("/api/machine", machineController.getAll);
    router.get("/api/machine/free", machineController.getAllFree)
    router.get("/api/machine/occupancy/:id", machineController.getOneOccupancy);
    router.post("/api/machine", addMachineValidator, machineController.create);
    router.delete("/api/machine/:id", machineController.delete);

    //MUNKÁSOK
    const workerController = new WorkerController();
    router.get("/api/worker", workerController.getAll);
    router.get("/api/worker/free", workerController.getAllFree)
    router.get("/api/worker/:id", workerController.getOne);
    router.post("/api/worker", addWorkerValidator, workerController.create);
    router.put("/api/worker/:id", updateWorkerValidator, workerController.update);
    router.put("/api/worker/addWork/:id", workerController.addWork);
    router.put("/api/worker/deleteWork/:id", workerController.deleteWork);
    router.delete("/api/worker/:id", workerController.delete);

    //MUNKÁK
    const workController = new WorkController();
    router.get("/api/work", workController.getAll);
    router.post("/api/work", addWorkValidator, workController.create);
    router.delete("/api/work/:id", workController.delete);

    return router;
}