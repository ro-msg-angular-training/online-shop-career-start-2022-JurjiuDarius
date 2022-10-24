import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { AllProductsDisplayComponent } from './all-products-display.component';

describe('AllProductsDisplayComponent', () => {
  let component: AllProductsDisplayComponent;
  let fixture: ComponentFixture<AllProductsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductsDisplayComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AllProductsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
