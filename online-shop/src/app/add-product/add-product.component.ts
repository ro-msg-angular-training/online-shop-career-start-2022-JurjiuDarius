import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProductService } from '../all-products/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent implements OnInit {
  formGroup: any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave() {
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
