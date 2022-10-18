import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { logIn } from '../state/auth-actions';
import { selectAuthStatus } from '../state/auth-selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formGroup: FormGroup;
  status$: Observable<String> | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.status$ = this.store.select(selectAuthStatus);
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  onSubmit() {
    let user = {
      username: this.formGroup.get('username')?.value,
      password: this.formGroup.get('password')?.value,
    };
    this.store.dispatch(logIn({ user: user }));
  }
}
