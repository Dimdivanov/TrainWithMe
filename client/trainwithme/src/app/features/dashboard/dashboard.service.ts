import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuth } from '../../types/userAuth';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable()
export class DashboardService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;
  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
