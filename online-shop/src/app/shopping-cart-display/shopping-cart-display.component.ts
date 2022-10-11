import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../classes/product';

@Component({
  selector: 'app-shopping-cart-display',
  templateUrl: './shopping-cart-display.component.html',
  styleUrls: ['./shopping-cart-display.component.sass'],
})
export class ShoppingCartDisplayComponent implements OnInit {
  @Input()
  products: Product[] = [];
  @Output()
  checkoutEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onParentCheckout() {
    this.checkoutEvent.emit();
  }
}
