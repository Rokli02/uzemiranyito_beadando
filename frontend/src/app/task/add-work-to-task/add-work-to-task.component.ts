import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { Work } from 'src/app/models/Work';
import { TaskService } from 'src/app/services/task.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-add-work-to-task',
  templateUrl: './add-work-to-task.component.html',
  styleUrls: ['./add-work-to-task.component.css']
})
export class AddWorkToTaskComponent implements OnInit {
  aform !: FormGroup;
  tasks : Task[] = [];
  works : Work[] = [];
  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private workService: WorkService) { }

  async ngOnInit() {
    this.aform = this.fb.group({
      task: ['', [Validators.required]],
      work: ['', [Validators.required]]
    });

    try {
      this.tasks = await this.taskService.getAll();
      this.works = await this.workService.getAll();
    } catch(err) {
      console.log(err);
    }
  }

  async addWorkToTask() {
    if(!this.aform.valid) {
      return;
    }

    try {
      const response : any = await this.taskService.addToWork(this.aform.get("task")?.value, this.aform.get("work")?.value);
      alert(response.message);
      this.aform.setValue({
        task: '',
        work: ''
      });
    } catch(err) {
      console.log(err);
    }
  }
}
