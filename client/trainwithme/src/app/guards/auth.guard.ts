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

  const requiresAuth = route.data['requiresAuth'] as boolean;

  if (requiresAuth && userService.isLogged) {
    return true;
  } else if (!requiresAuth && !userService.isLogged) {
    return true;
  }

  router.navigate(requiresAuth ? ['/home'] : ['/dashboard']);
  return false;
};
