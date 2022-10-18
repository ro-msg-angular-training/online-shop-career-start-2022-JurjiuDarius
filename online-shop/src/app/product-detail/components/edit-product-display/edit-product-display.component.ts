import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../classes/product';

@Component({
  selector: 'app-edit-product-display',
  templateUrl: './edit-product-display.component.html',
})
export class EditProductDisplayComponent {
  @Input()
  formGroup: FormGroup | undefined;
  @Input()
  product: Product | null | undefined;
  @Output()
  submitEvent = new EventEmitter();

  onParentSubmit() {
    this.submitEvent.emit();
  }
}
