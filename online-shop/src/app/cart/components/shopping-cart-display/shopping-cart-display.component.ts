import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../classes/product';
import { CartStatus } from '../../state/cart-reducers';
@Component({
  selector: 'app-shopping-cart-display',
  templateUrl: './shopping-cart-display.component.html',
  styleUrls: ['./shopping-cart-display.component.sass'],
})
export class ShoppingCartDisplayComponent {
  statusEnum = CartStatus;
  @Input()
  products: Product[] = [];
  @Input()
  status: String | undefined;
  @Output()
  checkoutEvent = new EventEmitter();

  onParentCheckout() {
    this.checkoutEvent.emit();
  }
}
