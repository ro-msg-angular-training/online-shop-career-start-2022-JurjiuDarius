import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  getAllProducts,
  getAllProductsSuccess,
} from './all-products-actions';
export enum ProductsStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}
export interface ProductsState {
  products: Product[];
  status: ProductsStatus;
}
export const initialProductsState: ProductsState = {
  products: [],
  status: ProductsStatus.SUCCESS,
};

export const allProductsReducer = createReducer(
  initialProductsState,
  on(addProduct, (state) => ({ ...state, status: ProductsStatus.PENDING })),
  on(addProductSuccess, (state, { product }) => ({
    ...state,
    status: ProductsStatus.SUCCESS,
    products: [...state.products, product],
  })),
  on(addProductFailure, (state, { error }) => ({
    ...state,
    status: ProductsStatus.ERROR,
    error: error,
  })),
  on(getAllProducts, (state) => ({ ...state, status: ProductsStatus.PENDING })),
  on(getAllProductsSuccess, (state, { products }) => ({
    status: ProductsStatus.SUCCESS,
    products: products,
  }))
);
