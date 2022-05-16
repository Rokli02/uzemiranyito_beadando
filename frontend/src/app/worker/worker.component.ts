import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status, Worker } from '../models/Worker';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  workers: Worker[] = [];
  errorMsg?: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private workerService: WorkerService) { }

  ngOnInit(): void {
    this.chooseRoute(this.route.snapshot.routeConfig?.path);
  }

  async chooseRoute(routePath: string | undefined) {
    if(routePath === undefined) {
      return;
    }
    switch(routePath) {
      case "worker": {
        try {
          this.workers = await this.workerService.getAll();
          if(this.workers.length < 1) {
            this.errorMsg = "Nem szerepelnek munkások az adatbázisban!"
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
      } break;
      case "worker/free": {
        try {
          this.workers = await this.workerService.getAllFree();
          if(this.workers.length < 1) {
            this.errorMsg = "Nem szerepelnek szabad munkások az adatbázisban!"
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
      } break;
      default: {
        console.log("unknown path");
      }
    }
  }

  updateWorker(id: number) {
    this.router.navigate(["worker","add", id]);
  }

  async deleteWorkFromWorker(workerId: number, workId: number) {
    try {
      const response : any = await this.workerService.deleteWork(workerId, workId);
      this.workers = this.workers.map(value => {
        if(value.id === workerId) {
          value.works = value.works.filter(work => work.id !== workId);
          if(value.works.length < 1) {
            value.status = Status.FREE;
          }
        }
        return value;
      });
      alert(response.message);
    } catch(err) {
      console.log(err);
      alert((err as HttpErrorResponse).error);
    }
  }
}
