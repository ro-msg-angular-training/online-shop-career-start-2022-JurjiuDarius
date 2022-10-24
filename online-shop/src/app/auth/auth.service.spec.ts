import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [AppModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable', () => {
    expect(
      service.logIn({ username: 'user', password: 'pass' })
    ).toBeInstanceOf(Observable);
  });

  it('should send login request', fakeAsync(
    inject(
      [AuthService, HttpTestingController],
      (authService: AuthService, backend: HttpTestingController) => {
        authService.logIn({ username: '', password: '' }).subscribe();
        backend.expectOne({
          url: 'http://localhost:3000/login',
          method: 'POST',
        });
      }
    )
  ));
});
