import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { logOut } from './auth/state/auth-actions';
import {
  hasGivenRole,
  selectIsLoggedIn,
  selectRoles,
} from './auth/state/auth-selectors';
import { find, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean> | undefined;
  public roles: String[] | undefined;
  constructor(public authService: AuthService, private store: Store) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.store.select(selectRoles).subscribe((res) => (this.roles = res));
  }

  onLogOut() {
    this.store.dispatch(logOut());
  }
  isCustomer(): Observable<boolean> {
    return this.store.select(hasGivenRole('customer'));
  }
}
