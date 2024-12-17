import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainer } from '../../types/trainer';

@Injectable()
export class TrainerService {
  constructor(private http: HttpClient) {}

  getAllTrainers() {
    return this.http.get<Trainer[]>(`/api/users/profile`);
  }
}
