import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-all-products-display',
  templateUrl: './all-products-display.component.html',
})
export class AllProductsDisplayComponent {
  @Input()
  products: Product[] = [];
  @Input()
  canAdd: boolean | undefined;
  @Input()
  status: String | undefined;
}
