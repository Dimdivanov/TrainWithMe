import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardData } from '../../types/dashboard';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  isEditMode: Boolean = false;
  private destroy$ = new Subject<void>();

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService
      .getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dashboardData = data;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
