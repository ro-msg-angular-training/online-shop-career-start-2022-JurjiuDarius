import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from '../all-products-smart/product.service';
import { addProduct } from '../state/all-products-actions';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private store: Store
  ) {
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      category: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(300),
        ],
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  onSave() {
    if (!this.formGroup.valid) {
      alert('The data you have put in is invalid!');
    }
    let product = {
      name: this.formGroup.get('name')?.value,
      category: this.formGroup.get('category')?.value,
      price: Number(this.formGroup.get('price')?.value),
      description: this.formGroup.get('description')?.value,
      image: this.formGroup.get('image')?.value,
    };
    this.store.dispatch(addProduct({ product }));
  }
}
