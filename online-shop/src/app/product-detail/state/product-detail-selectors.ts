import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product-detail-reducer';

export const selectProduct = createFeatureSelector<ProductState>('product');
export const selectProductDisplay = createSelector(
  selectProduct,
  (state: ProductState) => state.product
);
export const selectEditActive = createSelector(
  selectProduct,
  (state: ProductState) => state.editActive
);
export const selectProductStatus = createSelector(
  selectProduct,
  (state: ProductState) => state.status
);
