import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Machine } from '../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private baseUrl = "http://localhost:5000/api/machine";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get<Machine[]>(this.baseUrl));
  }

  save(machine: Machine) {
    return lastValueFrom(this.http.post<Machine>(this.baseUrl, machine))
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  getAllFree() {
    return lastValueFrom(this.http.get<Machine[]>(`${this.baseUrl}/free`));
  }

  getOneOccupancy(id: number) {
    return lastValueFrom(this.http.get<number>(`${this.baseUrl}/occupancy/${id}`));
  }
}
