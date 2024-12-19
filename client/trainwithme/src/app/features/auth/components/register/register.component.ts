import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../util/password.validator';
import { UserServiceService } from '../../service/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalToastrService } from '../../../../globaltoastr.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private toastr: GlobalToastrService
  ) {}

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.showError(
        'Please fill out all fields correctly.',
        'Form Error'
      );
      return;
    }

    const { username, email, password, rePassword, type } =
      this.registerForm.value;

    this.userService
      .register(username!, email!, password!, rePassword!, type!)
      .subscribe({
        next: () => {
          this.toastr.showSuccess('Registration successful!', 'Success');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.showError(
            error.message || 'Something went wrong',
            'Registration Failed'
          );
        },
      });
  }
}
