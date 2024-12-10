import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../features/auth/service/user-service.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // const isLoggedIn = true - will come from auth service
  const userService = inject(UserServiceService);
  if (!userService.isLogged) {
    router.navigate(['/home']);
  }

  return userService.isLogged;
};
