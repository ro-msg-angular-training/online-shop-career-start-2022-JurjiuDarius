import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private requiredRole: String = '';
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let redirectUrl = state.url;
    let roles = route.data['roles'] as Array<String>;
    return this.checkAuthorization(redirectUrl, roles);
  }

  checkAuthorization(url: String, requiredRoles: String[]): true | UrlTree {
    if (requiredRoles.length == 0) {
      return true;
    }
    if (this.authService.getRoles().length == 0) {
      this.authService.setRedirectUrl(url);
      return this.router.parseUrl('/login');
    }
    let roles = this.authService.getRoles();
    for (let requiredRole of requiredRoles) {
      let roleExists = false;
      for (let role of roles) {
        if (role == requiredRole) {
          roleExists = true;
        }
      }
      if (!roleExists) {
        alert(
          'You are not authorised to access this resource. Please log in with an authorised account'
        );
        return this.router.parseUrl('');
      }
    }
    return true;
  }
}
