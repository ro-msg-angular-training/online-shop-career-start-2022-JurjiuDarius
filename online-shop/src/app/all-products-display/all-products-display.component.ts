import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../classes/product';

@Component({
  selector: 'app-all-products-display',
  templateUrl: './all-products-display.component.html',
})
export class AllProductsDisplayComponent implements OnInit {
  @Input()
  products: Product[] = [];
  constructor() {}

  ngOnInit(): void {}
}
