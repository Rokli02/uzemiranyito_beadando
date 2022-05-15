import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select";
import { HandleWorkComponent } from './worker/handle-work/handle-work.component';
import { AddMachineToTaskComponent } from './task/add-machine-to-task/add-machine-to-task.component';
import { AddWorkToTaskComponent } from './task/add-work-to-task/add-work-to-task.component'

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
    AddTaskComponent,
    HandleWorkComponent,
    AddMachineToTaskComponent,
    AddWorkToTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
