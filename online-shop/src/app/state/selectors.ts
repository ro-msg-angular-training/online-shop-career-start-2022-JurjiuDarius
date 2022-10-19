import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsEntityAdapter, ProductsEntityState } from './state';

const selectState =
  createFeatureSelector<ProductsEntityState>('products-entity');

const adapterSelectors = productsEntityAdapter.getSelectors();

export const selectAllProducts = createSelector(
  selectState,
  adapterSelectors.selectAll
);

export const selectStatus = createSelector(
  selectState,
  (state) => state.status
);

export const selectProductEntities = createSelector(
  selectState,
  adapterSelectors.selectEntities
);
export const selectSingleProduct = createSelector(selectState, (state) => {
  if (
    state.entities[String(state.selectedProductId)]?.description == undefined
  ) {
  }
  return state.entities[String(state.selectedProductId)];
});
export const selectEditActive = createSelector(selectState, (state) => {
  return state.isEditActive;
});
