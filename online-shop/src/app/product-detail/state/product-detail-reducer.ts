import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
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

export enum ProductStatus {
  SUCCESS = 'success',
  LOADING = 'loading',
  PENDING = 'pending',
  ERROR = 'error',
}
export interface ProductState {
  product: Product;
  error: String | null;
  editActive: boolean;
  status: ProductStatus;
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
  status: ProductStatus.SUCCESS,
};

export const productDetailReducer = createReducer(
  initialProductState,
  on(loadProduct, (state) => ({ ...state, status: ProductStatus.LOADING })),

  on(loadProductSuccess, (state, { loadedProduct }) => ({
    ...state,
    error: null,
    status: ProductStatus.SUCCESS,
    product: loadedProduct,
  })),

  on(activateEdit, (state) => ({ ...state, editActive: true })),
  on(deleteProduct, (state) => ({ ...state, status: ProductStatus.PENDING })),
  on(deleteProductSuccess, (state) => ({
    ...state,
    status: ProductStatus.SUCCESS,
  })),
  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    status: ProductStatus.ERROR,
    error: error,
  })),
  on(editProduct, (state) => ({ ...state, status: ProductStatus.PENDING })),
  on(editProduct, (state, { product }) => ({
    ...state,
    status: ProductStatus.SUCCESS,
    product: product,
  })),
  on(editProductFailure, (state, { error }) => ({
    ...state,
    status: ProductStatus.ERROR,
    error: error,
  }))
);
