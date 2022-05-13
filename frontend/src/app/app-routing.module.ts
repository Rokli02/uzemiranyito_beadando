import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMachineComponent } from './machine/add-machine/add-machine.component';
import { MachineComponent } from './machine/machine.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import { AddWorkComponent } from './work/add-work/add-work.component';
import { WorkComponent } from './work/work.component';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
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
    path: "/work/add",
    component: AddWorkComponent
  },
  {
    path: "worker",
    component: WorkerComponent
  },
  {
    path: "worker/add",
    component: AddWorkerComponent
  },
  {
    path: "machine",
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
