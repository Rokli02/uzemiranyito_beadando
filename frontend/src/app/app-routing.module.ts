import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMachineComponent } from './machine/add-machine/add-machine.component';
import { MachineComponent } from './machine/machine.component';
import { AddMachineToTaskComponent } from './task/add-machine-to-task/add-machine-to-task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AddWorkToTaskComponent } from './task/add-work-to-task/add-work-to-task.component';
import { TaskComponent } from './task/task.component';
import { AddWorkComponent } from './work/add-work/add-work.component';
import { WorkComponent } from './work/work.component';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
import { HandleWorkComponent } from './worker/handle-work/handle-work.component';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
  {
    path: "",
    component: WorkComponent
  },
  {
    path: "work",
    component: WorkComponent
  },
  {
    path: "work/add",
    component: AddWorkComponent
  },
  {
    path: "worker",
    component: WorkerComponent
  },
  {
    path: "worker/free",
    component: WorkerComponent
  },
  {
    path: "worker/add",
    component: AddWorkerComponent
  },
  {
    path: "worker/add/:id",
    component: AddWorkerComponent
  },
  {
    path: "worker/work",
    component: HandleWorkComponent
  },
  {
    path: "machine",
    component: MachineComponent
  },
  {
    path: "machine/free",
    component: MachineComponent
  },
  {
    path: "machine/add",
    component: AddMachineComponent
  },
  {
    path: "task",
    component: TaskComponent
  },
  {
    path: "task/add",
    component: AddTaskComponent
  },
  {
    path: "task/machine",
    component: AddMachineToTaskComponent
  },
  {
    path: "task/work",
    component: AddWorkToTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
