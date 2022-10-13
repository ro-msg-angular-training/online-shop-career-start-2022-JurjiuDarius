import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProductService } from '../all-products/product.service';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
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
    this.productService.addProduct(product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
