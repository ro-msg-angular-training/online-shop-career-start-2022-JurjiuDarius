import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { editProduct } from 'src/app/state/actions';
import { Product } from '../../../classes/product';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  formGroup: FormGroup;
  @Input()
  product: Product | null | undefined;
  constructor(
    private fb: FormBuilder,
    private store: Store,
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
  ngOnInit(): void {
    this.formGroup.get('name')?.setValue(this.product?.name);
    this.formGroup.get('category')?.setValue(this.product?.category);
    this.formGroup.get('price')?.setValue(this.product?.price);
    this.formGroup.get('description')?.setValue(this.product?.description);
    this.formGroup.get('image')?.setValue(this.product?.image);
  }

  onSave() {
    let id = '';
    if (!this.formGroup.valid) {
      alert('The data you have put in is invalid!');
    }
    this.activatedRoute.params.subscribe((params) => (id = params['id']));
    let product = {
      id: id,
      name: this.formGroup.get('name')?.value,
      category: this.formGroup.get('category')?.value,
      price: Number(this.formGroup.get('price')?.value),
      description: this.formGroup.get('description')?.value,
      image: this.formGroup.get('image')?.value,
    };
    this.store.dispatch(editProduct({ product: product }));
  }
}
