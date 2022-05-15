import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Machine } from 'src/app/models/Machine';
import { Task } from 'src/app/models/Task';
import { Work } from 'src/app/models/Work';
import { MachineService } from 'src/app/services/machine.service';
import { TaskService } from 'src/app/services/task.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  tform !: FormGroup;
  machines : Machine[] = [];
  works: Work[] = [];
  constructor(private fb: FormBuilder,
              private machineService: MachineService,
              private workService: WorkService,
              private taskService: TaskService) { }

  async ngOnInit() {
    this.tform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      machine: [null, []],
      work: [null, []]
    });


    try {
      this.machines = await this.machineService.getAllFree();
      this.works = await this.workService.getAll();
    } catch(err) {
      console.log(err);
    }

  }

  async addTask() {
    if(!this.tform.valid) {
      return;
    }

    const newTask : Task = {
      id: 0,
      name: this.tform.get("name")?.value,
      machine: this.tform.get("machine")?.value,
      work: this.tform.get("work")?.value
    };

    try {
      const resultEntity = await this.taskService.save(newTask);
      if(!resultEntity) {
        alert("Nem sikerült új feladatot felvenni!");
        return;
      }

      this.tform.setValue({
        name: '',
        machine: '',
        work: ''
      });
      alert("Új feladat került hozzáadásra!");
    } catch(err) {
      console.log(err);
    }
  }
}
