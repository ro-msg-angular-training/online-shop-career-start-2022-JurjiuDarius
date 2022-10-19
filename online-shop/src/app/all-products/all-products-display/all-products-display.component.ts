import { Component, Input } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductsStatus } from '../../state/state';
@Component({
  selector: 'app-all-products-display',
  templateUrl: './all-products-display.component.html',
})
export class AllProductsDisplayComponent {
  statusEnum = ProductsStatus;
  @Input()
  products: Product[] = [];
  @Input()
  canAdd: boolean | undefined;
  @Input()
  status: String | undefined;
}
