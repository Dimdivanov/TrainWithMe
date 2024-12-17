import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { DashboardData } from '../../types/dashboard';

@Injectable()
export class DashboardService {
  private user$$ = new BehaviorSubject<DashboardData | null>(null);
  private user$ = this.user$$.asObservable();

  user: DashboardData | null = null;
  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http
      .get<DashboardData>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
