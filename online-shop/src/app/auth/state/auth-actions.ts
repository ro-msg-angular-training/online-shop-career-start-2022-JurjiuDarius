import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/classes/user';

export const logIn = createAction(
  '[Login page] Log in',
  props<{ user: User }>()
);
export const logInSuccess = createAction(
  '[Login page] Log in success',
  props<{ roles: String[]; username: String }>()
);
export const logInFailure = createAction(
  '[Login page] Log in failure',
  props<{ error: String }>()
);
export const logOut = createAction('[Main Page]');
