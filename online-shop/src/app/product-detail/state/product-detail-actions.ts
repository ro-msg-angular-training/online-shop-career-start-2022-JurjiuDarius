import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
import { ProductDetailComponent } from '../components/product-detail-smart/product-detail.component';

export const loadProduct = createAction(
  '[Product display] Load Product',
  props<{ id: String }>()
);

export const loadProductSuccess = createAction(
  '[Product Api] Product Load Success',
  props<{ loadedProduct: Product }>()
);
export const loadProductFailure = createAction(
  '[Product Api] Product Load Failure',
  props<{ error: String }>()
);

export const deleteProduct = createAction(
  '[Product display] Delete Product',
  props<{ id: String }>()
);
export const deleteProductSuccess = createAction(
  '[Product display] Delete Product Success'
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
  props<{ product: Product }>()
);
export const editProductFailure = createAction(
  '[Product display] Edit Product Failure',
  props<{ error: String }>()
);

export const addProductToCart = createAction(
  '[Product display] Add to cart',
  props<{ product: Product }>()
);

export const activateEdit = createAction('[Product display] Activate edit');
