import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from '../models/Worker';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  workers: Worker[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chooseRoute(this.route.snapshot.routeConfig?.path);
  }

  chooseRoute(routePath: string | undefined) {
    if(routePath === undefined) {
      return;
    }
    switch(routePath) {
      case "worker": {


      } break;
      case "worker/free": {


      } break;
      default: {
        console.log("unknown path");
      }
    }
  }
}
