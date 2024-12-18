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
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
  });
  constructor(
    private dashboardDetails: DashboardService,
    private userService: UserServiceService
  ) {}

  onEditSubmit() {
    if (this.editForm.valid) {
      const { username, email, imageUrl, bio } = this.editForm.value;
      this.userService
        .updateProfile(username!, email!, imageUrl!, bio!)
        .subscribe({
          next: (response) => {
            console.log('Profile updated successfully', response);
            this.cancel.emit();
          },
          error: (err) => {
            console.error('Error updating profile:', err);
          },
        });
    } else {
      console.log('Form is not valid');
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.dashboardDetails.getUserProfile().subscribe({
      next: (data) => {
        this.dashboardData = data;

        //populating the data from the API
        // Populate the form with the data from the API
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
