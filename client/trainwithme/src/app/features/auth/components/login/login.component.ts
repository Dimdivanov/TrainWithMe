import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';

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
    private router: Router
  ) {}

  login() {
    if (this.loginForm.invalid) {
      console.error('Invalid Login Form');
      return;
    }

    console.log(this.loginForm.get('email')?.value);

    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
