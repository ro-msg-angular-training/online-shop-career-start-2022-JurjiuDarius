import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { selectRoles } from './state/auth-selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, OnDestroy {
  private requiredRole: String = '';
  private currentRoles: String[] | undefined;
  private roleSubscription: Subscription | undefined;
  constructor(private router: Router, private store: Store) {
    this.roleSubscription = this.store
      .select(selectRoles)
      .subscribe((res) => (this.currentRoles = res));
  }
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
    if (this.currentRoles == undefined || this.currentRoles?.length == 0) {
      return this.router.parseUrl('/products');
    }
    let roles = this.currentRoles;
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
  ngOnDestroy(): void {
    this.roleSubscription?.unsubscribe;
  }
}
