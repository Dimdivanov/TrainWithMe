import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/post';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<User>('/api/users/profile');
  }
}
