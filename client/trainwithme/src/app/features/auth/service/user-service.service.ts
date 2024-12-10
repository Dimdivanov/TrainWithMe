import { Injectable } from '@angular/core';
import { UserForAuth } from '../../../types/userAuth';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  USER_KEY = '[user-key]';
  user: UserForAuth | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() {
    try {
      const isUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(isUser);
    } catch (error) {
      this.user = null;
    }
  }

  login() {
    this.user = {
      name: 'Mitaka',
      email: 'mitaka@abv.bg',
      password: '12345',
      accountType: 'trainer',
      id: '1dsasdasdadsda',
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }
  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY);
  }
}
