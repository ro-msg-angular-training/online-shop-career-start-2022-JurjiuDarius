import { Statement } from '@angular/compiler';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-reducers';

const authSelector = createFeatureSelector<AuthState>('auth');
export const selectRoles = createSelector(
  authSelector,
  (state: AuthState) => state.roles
);
export const selectIsLoggedIn = createSelector(
  authSelector,
  (state: AuthState) => state.status == 'loggged in'
);

export const hasGivenRole = (role: String) =>
  createSelector(
    authSelector,
    (state: AuthState) => state.roles.find((elem) => elem == role) != undefined
  );

export const selectAuthStatus = createSelector(
  authSelector,
  (state: AuthState) => state.status
);
