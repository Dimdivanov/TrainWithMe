import { Injectable } from '@angular/core';
import { UserForAuth } from '../../../types/userAuth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  user$ = this.user$$.asObservable();

  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  getUserId(ownerId: string): boolean {
    return this.user ? this.user.id === ownerId : false;
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>('/api/login', { email, password }).pipe(
      tap((user) => this.user$$.next(user)),
      catchError((error) => {
        if (error.status === 401) {
          return throwError(
            () => new Error('Invalid credentials. Please try again.')
          );
        } else {
          return throwError(() => new Error('An unexpected error occurred.'));
        }
      })
    );
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    type: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        password,
        rePassword,
        type,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null)));
  }

  updateProfile(
    username: string,
    email: string,
    imageUrl: string,
    bio: string
  ) {
    const payload = { username, email, imageUrl, bio };
    return this.http.put('/api/users/profile', payload);
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }
}
