import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from '../classes/product';

@Component({
  selector: 'app-product-detail-display',
  templateUrl: './product-detail-display.component.html',
})
export class ProductDetailDisplayComponent {
  @Input()
  product: Product | undefined;
  @Input()
  authService: AuthService | undefined;
  @Output()
  deleteEvent = new EventEmitter();
  @Output()
  editEvent = new EventEmitter();
  @Output()
  addToCartEvent = new EventEmitter();

  parentOnDelete() {
    this.deleteEvent.emit();
  }
  parentOnActivateEdit() {
    this.editEvent.emit();
  }
  parentOnAddToCart() {
    this.addToCartEvent.emit();
  }
}
