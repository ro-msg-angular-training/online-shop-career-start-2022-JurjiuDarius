import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Roles } from 'src/app/auth/state/auth-reducers';
import { selectRoles } from 'src/app/auth/state/auth-selectors';
import { addToCart } from 'src/app/cart/state/cart-actions';
import {
  activateEdit,
  deleteProduct,
  loadProduct,
  setCurrentProduct,
} from 'src/app/state/actions';
import { Product } from '../../../classes/product';
import {
  selectEditActive,
  selectSingleProduct,
  selectStatus,
} from '../../../state/selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  rolesEnum = Roles;
  public editActive$: Observable<boolean> | undefined;
  $status: Observable<String> | undefined;
  private productSubscription: Subscription | undefined;

  id: String | undefined;
  roles: String[] | undefined;
  public product: Product | undefined;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.store.dispatch(setCurrentProduct({ id }));
      this.store.dispatch(loadProduct({ id: String(id) }));
      //I'm not using the async pipe for product because I need it for other operations in the smart component
      this.productSubscription = this.store
        .select(selectSingleProduct)
        .subscribe((res) => (this.product = res));
    }

    this.editActive$ = this.store.select(selectEditActive);
    this.store.select(selectRoles).subscribe((res) => (this.roles = res));
    this.$status = this.store.select(selectStatus);
  }

  hasGivenRole(role: Roles): boolean {
    return this.roles?.find((elem) => elem == role) != undefined;
  }

  activateEdit() {
    this.store.dispatch(activateEdit());
  }

  onAddToCart(): void {
    if (this.product != undefined) {
      this.store.dispatch(
        addToCart({ product: { ...this.product, quantity: 1 } })
      );
    }
  }

  onDelete(): void {
    if (this.product != undefined) {
      this.store.dispatch(deleteProduct({ id: String(this.product.id) }));
    }
  }
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
