import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetail } from '../classes/user-detail';
import { CartService } from '../shopping-cart/cart.service';
enum Roles {
  ADMIN,
  USER,
  CUSTOMER,
  NONE,
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000';
  private roles: String[] = [];
  private redirectUrl: String = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {
    this.roles = JSON.parse(String(localStorage.getItem('roles')));
    if (!this.roles) {
      this.roles = [];
    }
  }

  logIn(user: User): Observable<UserDetail> {
    return this.http.post<UserDetail>(this.BASE_URL + '/login', user);
  }

  public getRoles(): String[] {
    return this.roles;
  }

  public getRedirectUrl(): String {
    return this.redirectUrl;
  }

  public setRedirectUrl(url: String) {
    this.redirectUrl = url;
  }

  public setRoles(roles: String[]) {
    this.roles = roles;
  }

  public hasGivenRole(givenRole: String): boolean {
    if (this.roles.find((element) => element == givenRole) != undefined) {
      return true;
    }
    return false;
  }

  public isLoggedIn(): boolean {
    return this.roles.length != 0;
  }

  public logOut(): void {
    this.roles = [];
    this.cartService.clearCart();
    localStorage.removeItem('roles');
  }
}
