import { createReducer, on } from '@ngrx/store';
import {
  activateEdit,
  addProduct,
  addProductFailure,
  addProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProduct,
  editProductFailure,
  editProductSuccess,
  getAllProducts,
  getAllProductsFailure,
  getAllProductsSuccess,
  loadProduct,
  loadProductSuccess,
  setCurrentProduct,
} from './actions';
import {
  initialProductsEntityState,
  productsEntityAdapter,
  ProductsStatus,
} from './state';

export const productsEntityReducer = createReducer(
  initialProductsEntityState,
  on(getAllProducts, (state) => {
    return {
      ...state,
      status: ProductsStatus.PENDING,
    };
  }),
  on(getAllProductsSuccess, (state, content) => {
    return {
      ...productsEntityAdapter.addMany(content.products, state),
      status: ProductsStatus.SUCCESS,
      error: '',
    };
  }),
  on(getAllProductsFailure, (state, content) => {
    return { ...state, error: String(content.error) };
  }),
  on(addProduct, (state, content) => {
    return { ...state, status: ProductsStatus.PENDING };
  }),
  on(addProductSuccess, (state, content) => {
    return {
      ...productsEntityAdapter.addOne(content.product, state),
      status: ProductsStatus.SUCCESS,
    };
  }),
  on(addProductFailure, (state, content) => {
    return {
      ...state,
      status: ProductsStatus.SUCCESS,
      error: String(content.error),
    };
  }),
  on(loadProduct, (state) => {
    console.log();
    return { ...state, status: ProductsStatus.PENDING };
  }),

  on(loadProductSuccess, (state, { product }) => {
    if (product == undefined) {
      return {
        ...state,
        status: ProductsStatus.SUCCESS,
      };
    }
    return {
      ...productsEntityAdapter.updateOne(product, state),
      error: '',
      status: ProductsStatus.SUCCESS,
    };
  }),

  on(activateEdit, (state) => ({ ...state, isEditActive: true })),
  on(deleteProduct, (state) => ({ ...state, status: ProductsStatus.PENDING })),
  on(deleteProductSuccess, (state, content) => {
    return {
      ...productsEntityAdapter.removeOne(String(content.id), state),
      status: ProductsStatus.SUCCESS,
    };
  }),
  on(deleteProductFailure, (state, { error }) => ({
    ...state,
    status: ProductsStatus.ERROR,
    error: String(error),
  })),
  on(editProduct, (state) => ({ ...state, status: ProductsStatus.PENDING })),
  on(editProductSuccess, (state, content) => ({
    ...productsEntityAdapter.updateOne(content.product, state),
    status: ProductsStatus.SUCCESS,
  })),
  on(editProductFailure, (state, { error }) => ({
    ...state,
    status: ProductsStatus.ERROR,
    error: String(error),
  })),
  on(setCurrentProduct, (state, content) => {
    return { ...state, selectedProductId: String(content.id) };
  })
);
