import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardArticles, DashboardData } from '../../../types/dashboard';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-articles-posted',
  standalone: true,
  imports: [RouterLink],
  providers: [DashboardService],
  templateUrl: './articles-posted.component.html',
  styleUrl: './articles-posted.component.css',
})
export class ArticlesPostedComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  dashboardData: DashboardData | null = null;
  userArticles: DashboardArticles[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getUserProfile().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isAuthenticating = false;
        if (this.dashboardData) {
          const userId = this.dashboardData._id;
          this.dashboardService.getUserArticles(userId).subscribe({
            next: (articles) => {
              this.userArticles = articles;
              console.log(this.userArticles);
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
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }

  onDelete(themeId: string) {
    this.dashboardService.deleteUserArticle(themeId).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  ngOnDestroy(): void {}
}
