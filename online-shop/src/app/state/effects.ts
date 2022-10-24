import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from '../all-products/all-products-smart/product.service';
import { Product } from '../classes/product';
import {
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
  loadProductFailure,
  loadProductSuccess,
} from './actions';
import { selectSingleProduct } from './selectors';
import { ProductsEntityState } from './state';

@Injectable()
export class AllProductsEntityEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<ProductsEntityState>,
    private router: Router
  ) {}

  $addProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) =>
        this.productService.addProduct(action.product).pipe(
          map((result) => {
            this.router.navigate(['/products']);
            return addProductSuccess({ product: result });
          }),
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
  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      switchMap((action) => {
        let storedProduct: Product | undefined;
        this.store
          .select(selectSingleProduct)
          .subscribe((res) => (storedProduct = res));
        if (
          storedProduct == undefined ||
          storedProduct.description == undefined
        ) {
          return this.productService.getProductById(action.id).pipe(
            map((product) =>
              loadProductSuccess({
                product: {
                  id: String(product.id),
                  changes: { ...product },
                },
              })
            ),
            catchError((error) => of(loadProductFailure({ error: error })))
          );
        }
        console.log('already loaded');
        return of(loadProductSuccess({ product: undefined }));
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) =>
        this.productService.deleteProductById(action.id).pipe(
          map(() => {
            this.router.navigate(['/products']);
            return deleteProductSuccess({ id: action.id });
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
          map(() => {
            return editProductSuccess({
              product: {
                id: String(action.product.id),
                changes: { ...action.product },
              },
            });
          }),
          catchError((error) => of(editProductFailure({ error: error })))
        )
      )
    )
  );
}
