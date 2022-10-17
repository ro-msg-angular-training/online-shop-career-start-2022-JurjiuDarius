import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { logIn, logInFailure, logInSuccess, logOut } from './auth-actions';

export interface AuthState {
  roles: String[];
  username: String;
  status: 'loggged in' | 'logged out' | 'pending' | 'error';
}

export const initialAuthState: AuthState = {
  roles: [],
  username: '',
  status: 'logged out',
};

export const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state, { user }) => ({
    ...state,
    username: user.username,
    status: 'pending',
  })),
  on(logInSuccess, (state, { roles, username }) => ({
    ...state,
    roles: roles,
    username: username,
    status: 'loggged in',
  })),
  on(logInFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(logOut, (state) => ({ roles: [], username: '', status: 'logged out' }))
);
