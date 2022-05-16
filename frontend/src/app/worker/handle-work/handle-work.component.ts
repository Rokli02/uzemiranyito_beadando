import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Work } from 'src/app/models/Work';
import { Worker } from 'src/app/models/Worker';
import { WorkService } from 'src/app/services/work.service';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-handle-work',
  templateUrl: './handle-work.component.html',
  styleUrls: ['./handle-work.component.css']
})
export class HandleWorkComponent implements OnInit {
  wform !: FormGroup;
  workers : Worker[] = [];
  works : Work[] = [];
  constructor(private workerService: WorkerService,
              private workService: WorkService,
              private fb: FormBuilder) { }

  async ngOnInit() {
    this.wform = this.fb.group({
      worker: ['', [Validators.required]],
      work: ['', [Validators.required]]
    });

    try {
      this.workers = await this.workerService.getAllFree();
      this.works = await this.workService.getAll();
    } catch(err) {
      console.log(err);
    }
  }

  async addWorkToWorker() {
    if(!this.wform.valid) {

    }

    const workerId = this.wform.get("worker")?.value;
    const workId = this.wform.get("work")?.value;

    try {
      const result : any = await this.workerService.addWork(workerId, workId);
      if(!result){
        alert("Nem sikerült munkához hozzárendelni a dolgozót");
        return;
      }
      this.workers = await this.workerService.getAllFree();
      alert(result.message);
    } catch(err) {
      console.log(err);
      alert((err as HttpErrorResponse).error);
    }
  }
}
