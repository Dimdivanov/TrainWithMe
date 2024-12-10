import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleServiceService } from './article-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  providers: [ArticleServiceService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
