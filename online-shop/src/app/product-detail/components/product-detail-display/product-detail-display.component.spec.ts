import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { ProductsStatus } from 'src/app/state/state';

import { ProductDetailDisplayComponent } from './product-detail-display.component';

describe('ProductDetailDisplayComponent', () => {
  let component: ProductDetailDisplayComponent;
  let fixture: ComponentFixture<ProductDetailDisplayComponent>;
  let deb: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailDisplayComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    deb = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have elements properly initialised', () => {
    expect(component.isAdmin).toBe(undefined);
    expect(component.isCustomer).toBe(undefined);
    expect(component.isUser).toBe(undefined);
    expect(component.product).toBe(undefined);
    expect(component.status).toBe(undefined);
  });
  it('should have elements properly updated', () => {
    component.product = { name: 'test product name', category: '', price: 0 };
    component.status = ProductsStatus.SUCCESS;
    fixture.detectChanges();
    let h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2.nativeNode.innerHTML).toContain('test product name');
    let h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeNode.innerHTML).toContain('Category');
  });
});
