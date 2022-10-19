import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllProducts } from 'src/app/state/actions';
import { selectAllProducts, selectStatus } from 'src/app/state/selectors';
import { AuthService } from '../../auth/auth.service';
import { hasGivenRole } from '../../auth/state/auth-selectors';
import { Product } from '../../classes/product';

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
    this.status$ = this.store.select(selectStatus);
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  canAdd(): Observable<boolean> {
    return this.store.select(hasGivenRole('admin'));
  }
}
