import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../classes/product';

@Component({
  selector: 'app-edit-product-display',
  templateUrl: './edit-product-display.component.html',
})
export class EditProductDisplayComponent {
  @Input()
  formGroup: FormGroup | undefined;
  @Input()
  product: Product | undefined;
  @Output()
  submitEvent = new EventEmitter();

  onParentSubmit() {
    this.submitEvent.emit();
  }
}
