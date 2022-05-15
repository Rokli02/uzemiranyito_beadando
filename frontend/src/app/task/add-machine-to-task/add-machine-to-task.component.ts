import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Machine } from 'src/app/models/Machine';
import { Task } from 'src/app/models/Task';
import { MachineService } from 'src/app/services/machine.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-machine-to-task',
  templateUrl: './add-machine-to-task.component.html',
  styleUrls: ['./add-machine-to-task.component.css']
})
export class AddMachineToTaskComponent implements OnInit {
  aform !: FormGroup;
  tasks : Task[] = [];
  machines : Machine[] = [];
  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private machineService: MachineService) { }

  async ngOnInit() {
    this.aform = this.fb.group({
      task: ['', [Validators.required]],
      machine: ['', [Validators.required]]
    });

    try {
      this.tasks = await this.taskService.getAll();
      this.machines = await this.machineService.getAllFree();
    } catch(err) {
      console.log(err);
    }
  }

  async addMachineToTask() {
    if(!this.aform.valid) {
      return;
    }
    try {
      const response : any = await this.taskService.addMachine(this.aform.get("task")?.value, this.aform.get("machine")?.value);
      alert(response.message);
      this.aform.setValue({
        task: '',
        machine: ''
      });
    } catch(err) {
      console.log(err);
    }
  }
}
