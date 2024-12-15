import { Injectable } from '@angular/core';
import { UserForAuth } from '../../../types/userAuth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    account: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        password,
        rePassword,
        account,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    this.user = null;
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
