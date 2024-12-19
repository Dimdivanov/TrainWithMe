import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { ToasterComponent } from '../../../../toaster/toaster.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToasterComponent],
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
    private toastr: ToastrService
  ) {}

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Form Error', {
        positionClass: 'toast-top-right',
      });
      return;
    }

    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
