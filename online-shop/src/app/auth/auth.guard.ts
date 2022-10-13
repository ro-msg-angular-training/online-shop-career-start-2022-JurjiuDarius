import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
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
  canActivateChild(
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
    if (!requiredRoles || requiredRoles.length == 0) {
      return true;
    }
    if (this.authService.getRoles().length == 0) {
      console.log(this.authService.getRoles());
      return this.router.parseUrl('/products');
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
        return this.router.parseUrl('');
      }
    }
    return true;
  }
}
