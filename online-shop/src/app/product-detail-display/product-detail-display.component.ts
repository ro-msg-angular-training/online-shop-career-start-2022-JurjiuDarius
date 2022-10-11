import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../classes/product';

@Component({
  selector: 'app-product-detail-display',
  templateUrl: './product-detail-display.component.html',
})
export class ProductDetailDisplayComponent implements OnInit {
  @Input()
  product: Product | undefined;
  @Output()
  deleteEvent = new EventEmitter();
  @Output()
  editEvent = new EventEmitter();
  @Output()
  addToCartEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

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
