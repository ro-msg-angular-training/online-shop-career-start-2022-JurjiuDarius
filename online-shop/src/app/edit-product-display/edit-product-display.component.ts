import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../classes/product';

@Component({
  selector: 'app-edit-product-display',
  templateUrl: './edit-product-display.component.html',
})
export class EditProductDisplayComponent implements OnInit {
  @Input()
  formGroup: any;
  @Input()
  product: Product | undefined;
  @Output()
  submitEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onParentSubmit() {
    this.submitEvent.emit();
  }
}
