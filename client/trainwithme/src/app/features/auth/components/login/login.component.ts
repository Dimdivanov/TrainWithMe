import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { GlobalToastrService } from '../../../../globaltoastr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private toastr: GlobalToastrService
  ) {}

  login() {
    if (this.loginForm.invalid) {
      this.toastr.showError('Please fill out all fields correctly.', 'Form Error');
      return;
    }

    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.userService.login(email, password).subscribe({
      next: () => {
        this.toastr.showSuccess('Login successful!', 'Success');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.toastr.showError(error.message || 'Something went wrong', 'Login Failed');
      },
    });
  }
}