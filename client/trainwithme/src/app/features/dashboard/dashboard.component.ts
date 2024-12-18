import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardData } from '../../types/dashboard';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Theme } from '../../types/post';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
import { ArticlesPostedComponent } from './articles-posted/articles-posted.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, EditDashboardComponent, ArticlesPostedComponent],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  themes: Theme[] = [];
  dashboardData: DashboardData | null = null;
  isEditMode: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchData(); 
  }
  
  fetchData(){
    this.dashboardService.getUserProfile().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }

  handleEdit(){
    this.fetchData();
  }

  handleCancel() {
    this.isEditMode = false;
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
