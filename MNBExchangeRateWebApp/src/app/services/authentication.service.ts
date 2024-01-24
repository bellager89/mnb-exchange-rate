import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../clients';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    this.userService.userLoginPost({username, password}).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token);
      this.router.navigate(['/']);
    });
  }

  public register(username: string, email: string, password: string): void {
    this.userService
      .userRegisterPost({username, email, password})
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/']);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}