import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
export const checkout = createAction('[Cart Page] Checkout');
export const checkoutSuccess = createAction('[API] Checkout success');
export const checkoutFailure = createAction(
  '[API] Checkout error',
  props<{ error: String }>()
);
export const addToCart = createAction(
  '[Product Page] Add to cart',
  props<{ product: Product }>()
);
export const addToCartSuccess = createAction('[API] Add to cart Success');
export const addToCartFailure = createAction(
  '[API] Add to cart Success',
  props<{ error: String }>()
);
export const clearCart = createAction('[Cart Page] Clear cart');
