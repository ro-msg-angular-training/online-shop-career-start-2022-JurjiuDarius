import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDisplayComponent } from './edit-product-display.component';

describe('EditProductDisplayComponent', () => {
  let component: EditProductDisplayComponent;
  let fixture: ComponentFixture<EditProductDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
