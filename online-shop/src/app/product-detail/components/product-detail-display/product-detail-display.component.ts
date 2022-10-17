import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../classes/product';
import { ProductStatus } from '../../state/product-detail-reducer';

@Component({
  selector: 'app-product-detail-display',
  templateUrl: './product-detail-display.component.html',
})
export class ProductDetailDisplayComponent {
  statusEnum = ProductStatus;
  @Input()
  product: Product | null | undefined;
  @Input()
  isAdmin: boolean | undefined;
  @Input()
  isCustomer: boolean | undefined;
  @Input()
  isUser: boolean | undefined;
  @Input()
  status: String | undefined;
  @Output()
  editEvent = new EventEmitter();
  @Output()
  deleteEvent = new EventEmitter();
  @Output()
  addToCartEvent = new EventEmitter();

  parentOnActivateEdit() {
    this.editEvent.emit();
  }
  parentOnDelete() {
    this.deleteEvent.emit();
  }
  parentOnAddToCart() {
    this.addToCartEvent.emit();
  }
}
