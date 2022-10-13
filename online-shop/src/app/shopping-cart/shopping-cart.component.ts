import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Product } from '../classes/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  constructor(private cartService: CartService, private router: Router) {}

  public getSelectedProducts(): Product[] {
    return this.cartService.getSelectedProducts();
  }
  public onCheckout(): void {
    this.cartService.checkOut().subscribe({
      next: (res) => {
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.cartService.clearCart();
        this.router.navigate(['/products']);
      },
    });
  }
}
