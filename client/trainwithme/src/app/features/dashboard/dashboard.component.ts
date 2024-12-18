import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardData } from '../../types/dashboard';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Theme } from '../../types/post';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, EditDashboardComponent],
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
  
  handleCancel() {
    this.isEditMode = false;
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
