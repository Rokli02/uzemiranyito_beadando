import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Work } from 'src/app/models/Work';
import { Status, Worker } from 'src/app/models/Worker';
import { WorkService } from 'src/app/services/work.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  wform!: FormGroup;
  workerId !: number;
  title : string = "hozzáadás";
  buttonText : string = "Hozzáadás";
  worker !: Worker;
  works: Work[] = [];
  statuses !: String[];
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private workerService: WorkerService,
              private workService: WorkService) { }

  async ngOnInit() {
    this.wform = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(256)]],
      qualification: ['', [Validators.required, Validators.maxLength(256)]],
      salary: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
      works: [[]]
    });

    this.route.params.subscribe((params) => {
      this.workerId = params['id'];
    });

    if(this.workerId) {
      try {
        this.worker = await this.workerService.getOne(this.workerId);
        this.title = "frissítés";
        this.buttonText = "Frissítés";
        this.wform.setValue({
          name: this.worker.name,
          qualification: this.worker.qualification,
          salary: this.worker.salary,
          status: this.worker.status,
          works: this.worker.works
        });
      } catch(err) {
      console.log(err);
      }
    }


    try {
      this.works = await this.workService.getAll();
    } catch(err) {
      console.log(err);
    }

    this.fillStatuses();
  }

  private fillStatuses() {
    this.statuses = [];
    Object.values(Status).forEach(value => this.statuses.push(value));
  }

  async addWorker() {
    console.log(this.wform.value);
    if(!this.wform.valid) {
      return;
    }

    const newWorker: Worker = {
      id: 0,
      name: this.wform.get("name")?.value,
      qualification: this.wform.get("qualification")?.value,
      salary: this.wform.get("salary")?.value,
      status: this.wform.get("status")?.value,
      works: this.wform.get("status")?.value === "Working" ? this.wform.get("works")?.value : []
    };

    try {
      if(this.worker) {
        const resultEntity = await this.workerService.update(newWorker, this.workerId);
        if(!resultEntity) {
          alert("Nem sikerült az új munkás felvétele!");
          return;
        }

        alert("Munkás frissítése sikeres!");
      } else {
        const resultEntity = await this.workerService.save(newWorker);
        if(!resultEntity) {
          alert("Nem sikerült az új munkás felvétele!");
          return;
        }

        this.wform.setValue({
          name: '',
          qualification: '',
          salary: 0,
          status: '',
          works: []
        });
        alert("Új munkás felvétele sikeres!");
      }

    } catch(err) {
      console.log(err);
    }
  }
}
