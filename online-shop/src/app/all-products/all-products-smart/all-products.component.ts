import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { hasGivenRole } from '../../auth/state/auth-selectors';
import { Product } from '../../classes/product';
import { addProduct, getAllProducts } from '../state/all-products-actions';
import {
  selectAllProducts,
  selectProductsStatus,
} from '../state/all-products-selectors';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  status$: Observable<String> | undefined;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private store: Store
  ) {
    this.store.dispatch(getAllProducts());
    this.status$ = this.store.select(selectProductsStatus);
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  canAdd(): Observable<boolean> {
    return this.store.select(hasGivenRole('admin'));
  }
}
