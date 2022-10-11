import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { CartService } from '../shopping-cart/cart.service';
import { Product } from '../classes/product';
import { ProductService } from '../all-products/product.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    let product$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        let id = String(params.get('id'));
        return this.productService.getProductById(id);
      })
    );
    product$.subscribe((res) => (this.product = res));
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
    if (this.product !== undefined) {
      this.productService
        .deleteProductById(this.product.id)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}
