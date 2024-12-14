import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../util/password.validator';

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

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      //marking every button with touched if not trigger the error
      Object.keys(this.registerForm.controls).forEach((controlName) => {
        this.registerForm.get(controlName)?.markAsTouched();
      });
      console.log('Register form is not Valid');
    }
  }
}
