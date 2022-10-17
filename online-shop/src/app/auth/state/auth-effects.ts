import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, switchMap, map, of } from 'rxjs';
import { ProductService } from 'src/app/all-products/all-products-smart/product.service';
import { AuthService } from '../auth.service';
import { logIn, logInSuccess, logInFailure } from './auth-actions';
import { AuthState } from './auth-reducers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logIn),
      switchMap((action) =>
        this.authService.logIn(action.user).pipe(
          map((result) =>
            logInSuccess({ roles: result.roles, username: result.username })
          ),
          catchError((error) => of(logInFailure({ error: error })))
        )
      )
    )
  );
}
