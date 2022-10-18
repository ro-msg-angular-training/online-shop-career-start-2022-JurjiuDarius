import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/classes/product';

export const addProduct = createAction(
  '[All products] Create Action',
  props<{ product: Product }>()
);
export const addProductSuccess = createAction(
  '[All products] Create Action Success',
  props<{ product: Product }>()
);
export const addProductFailure = createAction(
  '[All products] Create Action Failure',
  props<{ error: String }>()
);
export const getAllProducts = createAction('[All products] Get products');
export const getAllProductsSuccess = createAction(
  '[All products] Get products Success',
  props<{ products: Product[] }>()
);
export const getAllProductsFailure = createAction(
  '[All products] Get products Failure',
  props<{ error: String }>()
);
