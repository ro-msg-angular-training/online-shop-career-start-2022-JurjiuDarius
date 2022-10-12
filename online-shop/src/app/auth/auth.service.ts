import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetail } from '../classes/user-detail';
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
  roles: String[] = [];
  redirectUrl: String = '';
  constructor(private http: HttpClient, private router: Router) {
    this.roles = JSON.parse(String(localStorage.getItem('roles')));
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
    for (let role of this.roles) {
      if (role == givenRole) {
        return true;
      }
    }
    return false;
  }

  public isLoggedIn(): boolean {
    return this.roles.length != 0;
  }

  public logOut(): void {
    this.roles = [];
    localStorage.setItem('roles', JSON.stringify([]));
  }
}
