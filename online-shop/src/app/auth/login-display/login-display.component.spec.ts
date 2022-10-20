import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { LoginDisplayComponent } from './login-display.component';

describe('LoginDisplayComponent', () => {
  let component: LoginDisplayComponent;
  let fixture: ComponentFixture<LoginDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDisplayComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
