import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { Machine } from '../models/Machine';
import { Work } from '../models/Work';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  errorMsg?: string;
  constructor(private taskService: TaskService  ) { }

  async ngOnInit() {
    try {
      this.tasks = await this.taskService.getAll();
      if(this.tasks.length < 1) {
        this.errorMsg = "Nem szerepelnek feladatok az adatbázisban!"
        return;
      }

    } catch(err) {
      if(err instanceof HttpErrorResponse) {
        this.errorMsg = err.error;
      } else {
        console.log(err);
        this.errorMsg = "Hiba történt betöltés közben!"
      }
    }
  }

  async deleteMachine(id: number) {
    try {
      await this.taskService.deleteMachine(id);
      this.tasks = this.tasks.map(value => {
        if(value.id === id) {
          let emptyMachine !: Machine;
          value.machine = emptyMachine;
        }
        return value;
      })
    } catch(err) {
      console.log(err);
    }
  }

  async deleteWork(id: number) {
    try {
      await this.taskService.deleteFromWork(id);
      this.tasks = this.tasks.map(value => {
        if(value.id === id) {
          let emptyWork !: Work;
          value.work = emptyWork;
        }
        return value;
      })
    } catch(err) {
      console.log(err);
    }
  }
}
