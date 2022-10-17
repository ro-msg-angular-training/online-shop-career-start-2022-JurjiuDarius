import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, map } from 'rxjs';
import { ProductService } from '../all-products-smart/product.service';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  getAllProducts,
  getAllProductsFailure,
  getAllProductsSuccess,
} from './all-products-actions';
import { ProductsState } from './all-products-reducers';

@Injectable()
export class AllProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<ProductsState>
  ) {}

  $addProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map((result) => addProductSuccess({ product: result })),
          catchError((error) => of(addProductFailure({ error: error })))
        )
      )
    )
  );
  $getAllProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProducts),
      switchMap((action) =>
        this.productService.getProducts().pipe(
          map(
            (result) => getAllProductsSuccess({ products: result }),
            catchError((error) => of(getAllProductsFailure({ error: error })))
          )
        )
      )
    )
  );
}
