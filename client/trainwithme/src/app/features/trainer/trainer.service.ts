import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.development';
import { Trainer } from '../../types/trainer';

@Injectable()
export class TrainerService {
  constructor(private http: HttpClient) {}

  //get this authorized
  getAllTrainers() {
    const { apiUrl } = environment;
    return this.http.get<Trainer[]>(`${apiUrl}/users/profile`);
  }
}
