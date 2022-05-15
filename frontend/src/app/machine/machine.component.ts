import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../models/Machine';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  machines: Machine[] = [];
  machineOccup !: Map<number, number>;
  errorMsg?: string;
  constructor(private route: ActivatedRoute,
              private machineService: MachineService) { }

  ngOnInit(): void {
    this.chooseRoute(this.route.snapshot.routeConfig?.path);
    this.machineOccup = new Map<number, number>();
  }

  async chooseRoute(routePath: string | undefined) {
    console.log(routePath);
    if(routePath === undefined) {
      return;
    }
    switch(routePath) {
      case "machine": {
        try {
          this.machines = await this.machineService.getAll();
          if(this.machines.length < 1) {
            this.errorMsg = "Nem szerepelnek gépek az adatbázisban!"
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
      case "machine/free": {
        try {
          this.machines = await this.machineService.getAllFree();
          if(this.machines.length < 1) {
            this.errorMsg = "Nem szerepelnek szabad gépek az adatbázisban!"
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
        this.errorMsg = "Ismeretlen route használata!"
      }
    }
    console.log(this.machines);
  }

  async getOccupancy(id: number) {
    try {
      const occupancy = await this.machineService.getOneOccupancy(id);
      if(occupancy === undefined || occupancy === null) {
        return;
      }
      this.machineOccup.set(id, occupancy*100);
    } catch(err) {
      console.log(err);
    }
  }

  async deleteMachine(id: number) {
    try {
      await this.machineService.delete(id);
      this.machines = this.machines.filter(value => value.id !== id);
    } catch(err) {
      console.log(err);
    }
  }
}
