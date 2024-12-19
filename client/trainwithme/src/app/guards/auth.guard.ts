import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserServiceService } from '../features/auth/service/user-service.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserServiceService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
