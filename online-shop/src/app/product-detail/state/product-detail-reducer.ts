import { Product } from 'src/app/classes/product';
import { createReducer, on } from '@ngrx/store';
import {
  activateEdit,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProduct,
  editProductFailure,
  loadProduct,
  loadProductSuccess,
} from './product-detail-actions';
import { state } from '@angular/animations';

export interface ProductState {
  product: Product;
  error: String | null;
  editActive: boolean;
  status: 'pending' | 'loading' | 'error' | 'success';
}
export const initialProduct: Product = {
  name: '',
  category: '',
  price: 0,
};
export const initialProductState: ProductState = {
  product: initialProduct,
  editActive: false,
  error: '',
  status: 'success',
};

export const productDetailReducer = createReducer(
  initialProductState,
  on(loadProduct, (state) => ({ ...state, status: 'loading' })),

  on(loadProductSuccess, (state, { loadedProduct }) => ({
    ...state,
    error: null,
    status: 'success',
    product: loadedProduct,
  })),

  on(activateEdit, (state) => ({ ...state, editActive: true })),
  on(deleteProduct, (state) => ({ ...state, status: 'pending' })),
  on(deleteProductSuccess, (state) => ({ ...state, status: 'success' })),
  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  })),
  on(editProduct, (state) => ({ ...state, status: 'pending' })),
  on(editProduct, (state, { product }) => ({
    ...state,
    status: 'success',
    product: product,
  })),
  on(editProductFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  }))
);
