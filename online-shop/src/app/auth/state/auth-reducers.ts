import { createReducer, on } from '@ngrx/store';
import { logIn, logInFailure, logInSuccess, logOut } from './auth-actions';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  CUSTOMER = 'customer',
  NONE = 'none',
}
export enum AuthStatus {
  LOGGED_IN = 'logged in',
  LOGGED_OUT = 'logged out',
  PENDING = 'pending',
  ERROR = 'error',
}

export interface AuthState {
  roles: String[];
  username: String;
  status: AuthStatus;
}

export const initialAuthState: AuthState = {
  roles: [Roles.CUSTOMER, Roles.ADMIN],
  username: '',
  status: AuthStatus.LOGGED_OUT,
};

export const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state, { user }) => ({
    ...state,
    username: user.username,
    status: AuthStatus.PENDING,
  })),
  on(logInSuccess, (state, { roles, username }) => ({
    ...state,
    roles: roles,
    username: username,
    status: AuthStatus.LOGGED_IN,
  })),
  on(logInFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: AuthStatus.ERROR,
  })),
  on(logOut, (state) => ({
    roles: [],
    username: '',
    status: AuthStatus.LOGGED_OUT,
  }))
);
