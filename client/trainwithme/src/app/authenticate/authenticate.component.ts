import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserServiceService } from '../features/auth/service/user-service.service';
import { LoaderComponent } from '../shared/loader/loader.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userService
      .getProfile()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.isAuthenticating = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isAuthenticating = false;
        },
        complete: () => {
          this.isAuthenticating = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
