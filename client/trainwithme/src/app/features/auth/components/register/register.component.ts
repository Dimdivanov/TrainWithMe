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
      account: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  onRegisterSubmit() {
    const { username, email, password, rePassword, account } =
      this.registerForm.value;

    if (this.registerForm.valid) {
      this.userService
        .register(username!, email!, password!, rePassword!, account!)
        .subscribe(() => this.router.navigate(['/dashboard']));
    } else {
      //marking every button with touched if not trigger the error
      Object.keys(this.registerForm.controls).forEach((controlName) => {
        this.registerForm.get(controlName)?.markAsTouched();
      });
      console.log('Register form is not Valid');
    }
  }
}
