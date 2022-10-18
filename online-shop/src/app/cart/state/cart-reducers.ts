import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/classes/product';
import {
  addToCart,
  checkout,
  checkoutFailure,
  checkoutSuccess,
  clearCart,
} from './cart-actions';
export enum CartStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  PENDING = 'pending',
  PROCESSING = 'processing',
}
export interface CartState {
  products: Product[];
  status: CartStatus;
  error: String | null;
}

export const initialCartState: CartState = {
  products: [],
  status: CartStatus.SUCCESS,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,
  on(checkout, (state) => ({ ...state, status: CartStatus.PROCESSING })),
  on(clearCart, (state) => ({
    ...state,
    status: CartStatus.SUCCESS,
    products: [],
  })),
  on(checkoutSuccess, (state) => ({
    ...state,
    status: CartStatus.SUCCESS,
    products: [],
  })),
  //The http response that is returned cannot be parsed as json, which always gives an error. That's why the error and success order creation actions are the same.
  on(checkoutFailure, (state, { error }) => ({
    ...state,
    status: CartStatus.SUCCESS,
    products: [],
  })),
  on(addToCart, (state, { product }) => ({
    ...state,
    status: CartStatus.SUCCESS,
    products: ((products: Product[], addedProduct: Product) => {
      let newProducts = [];
      let exists = false;
      for (let product of products) {
        if (product.id == addedProduct.id && product.quantity != undefined) {
          let newProduct = { ...product, quantity: product.quantity + 1 };
          newProducts.push(newProduct);
          exists = true;
        } else {
          newProducts.push(product);
        }
      }
      if (!exists) {
        newProducts.push({ ...addedProduct, quantity: 1 });
      }

      return newProducts;
    })(state.products, product),
  }))
);
