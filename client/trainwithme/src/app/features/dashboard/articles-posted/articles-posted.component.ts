import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardArticles, DashboardData } from '../../../types/dashboard';
import { DashboardService } from '../dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-articles-posted',
  standalone: true,
  imports: [RouterLink],
  providers: [DashboardService],
  templateUrl: './articles-posted.component.html',
  styleUrls: ['./articles-posted.component.css'],
})
export class ArticlesPostedComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  dashboardData: DashboardData | null = null;
  userArticles: DashboardArticles[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.isAuthenticating = false;
          if (this.dashboardData) {
            const userId = this.dashboardData._id;
            this.dashboardService.getUserArticles(userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (articles) => {
                  this.userArticles = articles;
                },
                error: (err) => {
                  console.error('Error fetching articles:', err);
                },
              });
          }
        },
        error: () => {
          this.isAuthenticating = false;
        },
      });
  }

  onDelete(themeId: string): void {
    this.dashboardService.deleteUserArticle(themeId).subscribe({
      next: () => {
        // Remove the article from the list without needing another API call
        this.userArticles = this.userArticles.filter(article => article._id !== themeId);
      },
      error: (err) => {
        console.error('Error deleting article:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
