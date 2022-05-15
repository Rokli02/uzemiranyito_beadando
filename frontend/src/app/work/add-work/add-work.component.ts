import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { Work } from 'src/app/models/Work';
import { Worker } from 'src/app/models/Worker';
import { TaskService } from 'src/app/services/task.service';
import { WorkService } from 'src/app/services/work.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit {
  wform!: FormGroup;
  workers: Worker[] = [];
  tasks: Task[] = [];
  constructor(private fb: FormBuilder,
              private workService: WorkService,
              private workerService: WorkerService,
              private taskService: TaskService) { }

  async ngOnInit() {
    this.wform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      workers: [[]],
      tasks: [[], [Validators.required]]
    });

    try {
      this.workers = await this.workerService.getAllFree();
      this.tasks = await this.taskService.getAll();
    } catch(err) {
      console.log(err);
    }
  }

  async addWork() {
    if(!this.wform.valid) {
      return;
    }

    const newWork: Work = {
      id: 0,
      name: this.wform.get("name")?.value,
      workers: this.wform.get("workers")?.value,
      tasks: this.wform.get("tasks")?.value
    };

    try {
      const resultEntity = await this.workService.save(newWork);
      if(!resultEntity) {
        alert("Munka hozzáadása sikertelen!");
        return;
      }

      this.wform.setValue({
        name: '',
        workers: [],
        tasks: []
      });
      alert("Új munka sikeresen hozzáadva!");
    } catch(err) {
      console.log(err);
    }
  }
}
