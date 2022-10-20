import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { logIn, logInFailure, logInSuccess } from './auth-actions';
import { AuthState } from './auth-reducers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authService: AuthService,
    private router: Router
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logIn),
      switchMap((action) =>
        this.authService.logIn(action.user).pipe(
          map((result) => {
            this.router.navigate(['/products']);
            return logInSuccess({
              roles: result.roles,
              username: result.username,
            });
          }),
          catchError((error) => of(logInFailure({ error: error })))
        )
      )
    )
  );
}
