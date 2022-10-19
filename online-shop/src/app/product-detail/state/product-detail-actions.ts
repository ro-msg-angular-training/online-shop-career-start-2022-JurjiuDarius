import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/classes/product';

export const addProductToCart = createAction(
  '[Product display] Add to cart',
  props<{ product: Product }>()
);
