import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "http://localhost:5000/api/task";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get<Task[]>(this.baseUrl));
  }

  save(task: Task) {
    return lastValueFrom(this.http.post<Task>(this.baseUrl, task))
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  addMachine(id: number, machineId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/machine/add/${id}`, {}, {
      params: {
        machineId: machineId
      }
    }))
  }

  deleteMachine(id: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/machine/delete/${id}`, {}))
  }

  addToWork(id: number, workId: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/work/add/${id}`, {}, {
      params: {
        workId: workId
      }
    }))
  }

  deleteFromWork(id: number) {
    return lastValueFrom(this.http.put(`${this.baseUrl}/work/delete/${id}`, {}))
  }
}
