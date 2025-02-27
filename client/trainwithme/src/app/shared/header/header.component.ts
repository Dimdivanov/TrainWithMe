import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../features/auth/service/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  get userName(): string {
    return this.userService.user?.username || '';
  }
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}
  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
