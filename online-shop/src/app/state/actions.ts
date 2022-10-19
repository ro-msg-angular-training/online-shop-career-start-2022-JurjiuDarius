import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from '../classes/product';

export const getAllProducts = createAction('[All products] Get products');
export const getAllProductsSuccess = createAction(
  '[All products] Get products Success',
  props<{ products: Product[] }>()
);
export const getAllProductsFailure = createAction(
  '[All products] Get products Failure',
  props<{ error: String }>()
);
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

export const loadProduct = createAction(
  '[Product display] Load Product',
  props<{ id: String }>()
);

export const loadProductSuccess = createAction(
  '[Product Api] Product Load Success',
  props<{ loadedProduct: Update<Product> | undefined }>()
);
export const loadProductFailure = createAction(
  '[Product Api] Product Load Failure',
  props<{ error: String }>()
);

export const setCurrentProduct = createAction(
  '[Product display] Select Product',
  props<{ id: String }>()
);
export const deleteProduct = createAction(
  '[Product display] Delete Product',
  props<{ id: String }>()
);
export const deleteProductSuccess = createAction(
  '[Product display] Delete Product Success',
  props<{ id: String }>()
);
export const deleteProductFailure = createAction(
  '[Product display] Delete Product Failure',
  props<{ error: String }>()
);
export const editProduct = createAction(
  '[Product display] Edit Product',
  props<{ product: Product }>()
);
export const editProductSuccess = createAction(
  '[Product display] Edit Product Success',
  props<{ product: Update<Product> }>()
);
export const editProductFailure = createAction(
  '[Product display] Edit Product Failure',
  props<{ error: String }>()
);
export const activateEdit = createAction(
  '[Product display] Edit product activation'
);
