import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './all-products-reducers';
const selectProducts = createFeatureSelector<ProductsState>('products');
export const selectProductsStatus = createSelector(
  selectProducts,
  (state: ProductsState) => state.status
);

export const selectAllProducts = createSelector(
  selectProducts,
  (state: ProductsState) => state.products
);
