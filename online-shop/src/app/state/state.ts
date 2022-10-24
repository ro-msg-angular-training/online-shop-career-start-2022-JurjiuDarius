import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../classes/product';

export enum ProductsStatus {
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}
export interface ProductsEntityState extends EntityState<Product> {
  error: String;
  status: ProductsStatus;
  isEditActive: boolean;
  selectedProductId: String;
}
export const productsEntityAdapter = createEntityAdapter<Product>({});
export const initialProductsEntityState = productsEntityAdapter.getInitialState(
  {
    error: '',
    status: ProductsStatus.SUCCESS,
    isEditActive: false,
    selectedProductId: '',
  }
);
