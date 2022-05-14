import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last, lastValueFrom } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = "http://localhost:5000/api/task";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get(this.baseUrl));
  }

  save(task: Task) {
    return lastValueFrom(this.http.post(this.baseUrl, task))
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  changeMachine(id: number, machineId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/machine/change/${id}`, {}, {
      params: {
        machineId: machineId
      }
    }))
  }

  addToWork(id: number, workId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/work/add/${id}`, {}, {
      params: {
        workId: workId
      }
    }))
  }

  deleteFromWork(id: number, workId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/work/delete/${id}`, {}, {
      params: {
        workId: workId
      }
    }))
  }
}
