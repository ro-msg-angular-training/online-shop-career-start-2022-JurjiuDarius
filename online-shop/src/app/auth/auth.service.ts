import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { UserDetail } from '../classes/user-detail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly BASE_URL = 'http://localhost:3000';
  private roles: String[] = [];
  private redirectUrl: String = '';
  constructor(private http: HttpClient) {
    this.roles = JSON.parse(String(localStorage.getItem('roles')));
    if (!this.roles) {
      this.roles = [];
    }
  }

  logIn(user: User): Observable<UserDetail> {
    return this.http.post<UserDetail>(this.BASE_URL + '/login', user);
  }

  public getRedirectUrl(): String {
    return this.redirectUrl;
  }

  public setRedirectUrl(url: String) {
    this.redirectUrl = url;
  }
}
