import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Work } from '../models/Work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  baseUrl = "http://localhost:5000/api/work";
  constructor(private http: HttpClient) { }

  getAll() {
    return lastValueFrom(this.http.get(this.baseUrl));
  }

  save(work: Work) {
    return lastValueFrom(this.http.post(this.baseUrl, work))
  }

  delete(id: number) {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
}
