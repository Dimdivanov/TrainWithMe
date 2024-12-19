import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DashboardData } from '../../../types/dashboard';
import { DashboardService } from '../dashboard.service';
import { UserServiceService } from '../../auth/service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.css'],
})
export class EditDashboardComponent implements OnInit, OnDestroy {
  @Output() cancel = new EventEmitter<void>();
  @Output() editDash = new EventEmitter<void>();

  dashboardData: DashboardData | null = null;
  private destroy$ = new Subject<void>();

  editForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    imageUrl: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private dashboardDetails: DashboardService,
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dashboardDetails
      .getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.dashboardData = data;
          if (this.dashboardData) {
            this.editForm.patchValue({
              username: this.dashboardData.username,
              email: this.dashboardData.email,
              imageUrl: this.dashboardData.imageUrl,
              bio: this.dashboardData.bio,
            });
          }
        },
        error: (err) => {
          console.error('Error fetching user profile:', err);
          this.toastr.error('Failed to load user profile.', 'Error', {
            positionClass: 'toast-top-right',
          });
        },
      });
  }

  onEditSubmit() {
    if (this.editForm.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Form Error', {
        positionClass: 'toast-top-right',
      });
      return;
    }
    const { username, email, imageUrl, bio } = this.editForm.value;
    this.userService
      .updateProfile(username ?? '', email ?? '', imageUrl ?? '', bio ?? '')
      .subscribe({
        next: () => {
          this.toastr.success('Edit successful', 'Success', {
            positionClass: 'toast-top-right',
          });
          this.cancel.emit();
          this.editDash.emit();
        },
        error: (error) => {
          this.toastr.error(
            error.message || 'Something went wrong',
            'Edit Failed',
            {
              positionClass: 'toast-top-right',
            }
          );
        },
      });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
