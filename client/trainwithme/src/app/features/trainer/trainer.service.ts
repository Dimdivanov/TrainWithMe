import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainerFound, User } from '../../types/post';

@Injectable()
export class TrainerService {
  constructor(private http: HttpClient) {}

  searchTrainer(searchTerm: string) {
    return this.http.get<TrainerFound>(`/api/users/profiles/${searchTerm}`);
  }

  getAllTrainers() {
    return this.http.get<User[]>('/api/users/profiles/all');
  }
}
