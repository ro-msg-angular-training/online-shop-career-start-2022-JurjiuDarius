import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { CartService } from '../shopping-cart/cart.service';
import { Product } from '../classes/product';
import { ProductService } from '../all-products/product.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public product: Product | undefined;
  public editActive: boolean | undefined = false;
  id: String | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.productService
        .getProductById(id)
        .subscribe((res) => (this.product = res));
    }
  }

  activateEdit() {
    this.editActive = true;
  }

  onAddToCart(): void {
    if (this.product !== undefined) {
      this.cartService.addProductToCart(this.product);
    }
  }

  onDelete(): void {
    if (this.product !== undefined && this.product.id != undefined) {
      this.productService
        .deleteProductById(this.product.id)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}
