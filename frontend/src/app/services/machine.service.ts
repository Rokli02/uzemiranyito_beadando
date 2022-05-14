import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Machine } from '../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  baseUrl = "http://localhost:5000/api/machine";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get(this.baseUrl));
  }

  save(machine: Machine) {
    return lastValueFrom(this.http.post(this.baseUrl, machine))
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  getAllFree() {
    return lastValueFrom(this.http.get(`${this.baseUrl}/free`));
  }

  getOneOccupancy(id: number) {
    return lastValueFrom(this.http.get(`${this.baseUrl}/occupancy/${id}`));
  }
}
