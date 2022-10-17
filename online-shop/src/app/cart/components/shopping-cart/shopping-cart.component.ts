import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Product } from '../../../classes/product';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { checkout } from '../../state/cart-actions';
import {
  selectCartProducts,
  SelectCartStatus,
} from '../../state/cart-selectors';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  products$: Observable<Product[]> | undefined;
  status$: Observable<String> | undefined;
  constructor(private router: Router, private store: Store) {
    this.status$ = this.store.select(SelectCartStatus);
    this.products$ = this.store.select(selectCartProducts);
  }

  public onCheckout(): void {
    this.store.dispatch(checkout());
  }
}
