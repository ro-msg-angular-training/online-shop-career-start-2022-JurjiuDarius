import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  getAllProducts,
  getAllProductsSuccess,
} from './all-products-actions';
export interface ProductsState {
  products: Product[];
  status: 'success' | 'pending' | 'error';
}
export const initialProductsState: ProductsState = {
  products: [],
  status: 'pending',
};

export const allProductsReducer = createReducer(
  initialProductsState,
  on(addProduct, (state) => ({ ...state, status: 'pending' })),
  on(addProductSuccess, (state, { product }) => ({
    ...state,
    status: 'success',
    products: [...state.products, product],
  })),
  on(addProductFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error: error,
  })),
  on(getAllProducts, (state) => ({ ...state, status: 'pending' })),
  on(getAllProductsSuccess, (state, { products }) => ({
    status: 'success',
    products: products,
  }))
);
