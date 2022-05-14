import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Worker } from '../models/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  baseUrl = "http://localhost:5000/api/worker";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get(this.baseUrl));
  }

  getAllFree() {
    return lastValueFrom(this.http.get(`${this.baseUrl}/free`));
  }

  save(worker: Worker) {
    return lastValueFrom(this.http.post(`${this.baseUrl}`, worker));
  }

  update(worker: Worker, id: number) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/${id}`, worker));
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  addWork(id: number, workId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/addWork/${id}`, {}, {
      params: {
        workId: workId
      }
    }));
  }

  deleteWork(id: number, workId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/deleteWork/${id}`, {}, {
      params: {
        workId: workId
      }
    }));
  }
}
