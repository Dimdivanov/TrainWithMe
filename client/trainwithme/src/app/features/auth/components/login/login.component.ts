import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //use this service fake to login and then the router to navigate when logged in
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  login(form: NgForm) {
    console.log(form.form.value);
    if (form.invalid) {
      return;
    }
    this.userService.login();
    this.router.navigate(['/dashboard']);
  }
}
