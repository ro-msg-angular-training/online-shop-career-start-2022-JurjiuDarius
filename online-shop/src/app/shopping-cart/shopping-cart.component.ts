import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { Product } from '../classes';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  public getSelectedProducts(): Product[] {
    return this.cartService.getSelectedProducts();
  }
  public onCheckout(): void {
    this.cartService.checkOut();
  }
}
