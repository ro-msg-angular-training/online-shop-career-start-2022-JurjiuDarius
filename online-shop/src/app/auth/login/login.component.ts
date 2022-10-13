import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
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
    let request = this.authService.logIn(user);
    request.subscribe({
      next: (res) => {
        this.authService.setRoles(res.roles);
        localStorage.setItem('roles', JSON.stringify(res.roles));
        this.router.navigate([this.authService.getRedirectUrl()]);
      },
      error: (err) => {
        alert('Invalid credentials!');
      },
    });
  }
}
