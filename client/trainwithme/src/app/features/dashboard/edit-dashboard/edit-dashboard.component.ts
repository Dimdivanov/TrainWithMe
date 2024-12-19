import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-edit-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-dashboard.component.html',
  styleUrl: './edit-dashboard.component.css',
})
export class EditDashboardComponent implements OnInit {
  @Output() cancel = new EventEmitter<void>();

  dashboardData: DashboardData | null = null;

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

  onEditSubmit() {
    if (this.editForm.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Form Error', {
        positionClass: 'toast-top-right',
      });
      return;
    }
    const { username, email, imageUrl, bio } = this.editForm.value;
    this.userService
      .updateProfile(username!, email!, imageUrl!, bio!)
      .subscribe({
        next: () => {
          this.toastr.success('Edit successful', 'Success', {
            positionClass: 'toast-top-right',
          });

          this.cancel.emit();
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

  onCancel(): void{
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.dashboardDetails.getUserProfile().subscribe({
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
      },
    });
  }
}
