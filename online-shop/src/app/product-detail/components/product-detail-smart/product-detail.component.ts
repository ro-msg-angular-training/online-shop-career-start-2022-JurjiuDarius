import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectRoles } from 'src/app/auth/state/auth-selectors';
import { addToCart } from 'src/app/cart/state/cart-actions';
import { ProductService } from '../../../all-products/all-products-smart/product.service';
import { CartService } from '../../../cart/components/shopping-cart/cart.service';
import { Product } from '../../../classes/product';
import {
  activateEdit,
  deleteProduct,
  loadProduct,
} from '../../state/product-detail-actions';
import {
  selectEditActive,
  selectProductDisplay,
  selectProductStatus,
} from '../../state/product-detail-selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public editActive$: Observable<boolean> | undefined;
  $status: Observable<String> | undefined;
  private productSubscription: Subscription | undefined;

  id: String | undefined;
  roles: String[] | undefined;
  public product: Product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(loadProduct({ id: String(id) }));
    //I'm not using the async pipe for product because I need it for other operations in the smart component
    this.productSubscription = this.store
      .select(selectProductDisplay)
      .subscribe((res) => (this.product = res));
    this.editActive$ = this.store.select(selectEditActive);
    this.store.select(selectRoles).subscribe((res) => (this.roles = res));
    this.$status = this.store.select(selectProductStatus);
  }

  hasGivenRole(role: String): boolean {
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
      this.router.navigate(['/products']);
    }
  }
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
