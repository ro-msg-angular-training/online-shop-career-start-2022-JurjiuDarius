import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductService } from '../all-products/product.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  formGroup: FormGroup;
  @Input()
  product: Product | undefined;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
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
    let id = '';
    if (!this.formGroup.valid) {
      alert('The data you have put in is invalid!');
    }
    this.activatedRoute.params.subscribe((params) => (id = params['id']));
    let product = {
      name: this.formGroup.get('name')?.value,
      category: this.formGroup.get('category')?.value,
      price: Number(this.formGroup.get('price')?.value),
      description: this.formGroup.get('description')?.value,
      image: this.formGroup.get('image')?.value,
    };

    this.productService.updateProduct(id, product).subscribe(() => {
      this.router.navigate(['/products/', id]);
    });
  }
}
