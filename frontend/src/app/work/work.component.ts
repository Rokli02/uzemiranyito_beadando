import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Work } from '../models/Work';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  works: Work[] = [];
  errorMsg?: string;
  constructor(private workService: WorkService) { }

  async ngOnInit() {
    try {
      this.works = await this.workService.getAll();
      if(this.works.length < 1) {
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
  }

}
