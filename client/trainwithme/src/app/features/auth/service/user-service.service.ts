import { Injectable } from '@angular/core';
import { UserForAuth } from '../../../types/userAuth';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  USER_KEY = '[user-key]';
  user: UserForAuth | null = null;
  constructor() {
    try {
    } catch (error) {}
  }

  login() {}
  logout() {}
  
}
