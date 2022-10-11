import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailDisplayComponent } from './product-detail-display.component';

describe('ProductDetailDisplayComponent', () => {
  let component: ProductDetailDisplayComponent;
  let fixture: ComponentFixture<ProductDetailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
