import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, switchMap, map, of } from 'rxjs';
import { ProductService } from 'src/app/all-products/all-products-smart/product.service';
import { CartService } from '../components/shopping-cart/cart.service';
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  checkout,
  checkoutFailure,
  checkoutSuccess,
  clearCart,
} from './cart-actions';
import { CartState } from './cart-reducers';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CartState>,
    private cartService: CartService
  ) {}

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkout),
      switchMap((action) =>
        this.cartService.checkOut().pipe(
          map((product) => checkoutSuccess()),
          catchError((error) => of(checkoutFailure(error)))
        )
      )
    )
  );
}
