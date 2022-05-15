import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService } from 'src/app/services/machine.service';
import { Machine } from '../../models/Machine';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {
  mform !: FormGroup;
  constructor(private fb: FormBuilder,
              private machineService: MachineService) { }

  ngOnInit(): void {
    this.mform = this.fb.group({
      type: ['', [Validators.required, Validators.maxLength(256)]],
      maxNumOfTasks: [1, [Validators.required, Validators.min(1)]]
    });
  }


  async addMachine() {
    if(!this.mform.valid) {
      return;
    }

    const newMachine: Machine = {
      id: 0,
      type: this.mform.get("type")?.value,
      maxNumOfTasks: this.mform.get("maxNumOfTasks")?.value,
      tasks: []
    }

    try {
      const resultEntity = await this.machineService.save(newMachine);
      if(!resultEntity) {
        alert("Nem sikerült új gépet felvinni!");
        return;
      }

      this.mform.setValue({
        type: '',
        maxNumOfTasks: 1
      })
      alert("Új gép került hozzáadásra!");
    } catch(err) {
      console.log(err);
    }
  }
}
