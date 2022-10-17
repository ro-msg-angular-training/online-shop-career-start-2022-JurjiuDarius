import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from 'src/app/all-products/all-products-smart/product.service';
import {
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  editProduct,
  editProductFailure,
  editProductSuccess,
  loadProduct,
  loadProductFailure,
  loadProductSuccess,
} from './product-detail-actions';
import { ProductState } from './product-detail-reducer';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private store: Store<ProductState>,
    private productService: ProductService,
    private router: Router
  ) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      switchMap((action) =>
        this.productService.getProductById(action.id).pipe(
          map((product) => loadProductSuccess({ loadedProduct: product })),
          catchError((error) => of(loadProductFailure({ error: error })))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) =>
        this.productService.deleteProductById(action.id).pipe(
          map(() => {
            this.router.navigate(['/products']);
            return deleteProductSuccess();
          }),
          catchError((error) => of(deleteProductFailure({ error: error })))
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      switchMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((result) => editProductSuccess({ product: result })),
          catchError((error) => of(editProductFailure({ error: error })))
        )
      )
    )
  );
}
