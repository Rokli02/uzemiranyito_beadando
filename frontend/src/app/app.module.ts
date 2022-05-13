import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkComponent } from './work/work.component';
import { WorkerComponent } from './worker/worker.component';
import { MachineComponent } from './machine/machine.component';
import { TaskComponent } from './task/task.component';
import { AddWorkComponent } from './work/add-work/add-work.component';
import { AddWorkerComponent } from './worker/add-worker/add-worker.component';
import { AddMachineComponent } from './machine/add-machine/add-machine.component';
import { AddTaskComponent } from './task/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WorkComponent,
    WorkerComponent,
    MachineComponent,
    TaskComponent,
    AddWorkComponent,
    AddWorkerComponent,
    AddMachineComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
