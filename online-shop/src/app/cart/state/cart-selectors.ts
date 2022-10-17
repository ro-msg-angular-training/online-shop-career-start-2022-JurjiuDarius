import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart-reducers';

const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
  selectCart,
  (state: CartState) => state.products
);

export const SelectCartStatus = createSelector(
  selectCart,
  (state: CartState) => state.status
);
