import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { DashboardArticles, DashboardData } from '../../types/dashboard';

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

  getUserArticles(userId: string) {
    return this.http.get<DashboardArticles[]>(
      `/api/themes/user/${userId}/articles`
    );
  }

  deleteUserArticle(themeId: string) {
    return this.http
      .delete(`/api/themes/${themeId}/delete`)
      .pipe(tap(() => console.log('article deleted')));
  }
}
