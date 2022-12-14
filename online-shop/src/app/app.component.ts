import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { logOut } from './auth/state/auth-actions';
import { Roles } from './auth/state/auth-reducers';
import {
  hasGivenRole,
  selectIsLoggedIn,
  selectRoles,
} from './auth/state/auth-selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean> | undefined;
  public roles: String[] | undefined;
  isCustomer$: Observable<Boolean> | undefined;
  constructor(public authService: AuthService, private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.store.select(selectRoles).subscribe((res) => (this.roles = res));
    this.isCustomer$ = this.store.select(hasGivenRole(Roles.CUSTOMER));
  }

  onLogOut() {
    this.store.dispatch(logOut());
  }
}
