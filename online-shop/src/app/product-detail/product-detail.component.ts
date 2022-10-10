import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { CartService } from '../cart.service';
import { Product } from '../classes';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product$ = this.activatedRoute.paramMap.pipe(
      switchMap((params) => {
        let id = String(params.get('id'));
        return this.productService.getProductById(id);
      })
    );
  }

  onAddToCart(): void {
    if (this.product$ != undefined) {
      this.product$.subscribe((res) => this.cartService.addProductToCart(res));
    }
  }

  onDelete(): void {
    this.product$?.subscribe((res) => {
      this.productService.deleteProductById(res.id);
    });
    this.router.navigate(['']);
  }
}
