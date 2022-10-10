import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './classes';
import { ProductPostTemplate } from './classes';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly BASE_URL = 'http://localhost:3000';
  selectedProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  addProductToCart(product: Product) {
    let alreadyExists: boolean = false;
    for (let item of this.selectedProducts) {
      if (item.id == product.id) {
        item.quantity += 1;
        alreadyExists = true;
      }
    }
    if (!alreadyExists) {
      product.quantity = 1;
      this.selectedProducts?.push(product);
    }
  }
  public getSelectedProducts(): Product[] {
    return this.selectedProducts;
  }
  public checkOut() {
    let productTemplateList = [];
    for (let product of this.selectedProducts) {
      let productTemplate = {
        productId: product.id,
        quantity: product.quantity,
      };
      productTemplateList.push(productTemplate);
    }

    let body = { customer: 'blackj', products: productTemplateList };

    this.http.post(this.BASE_URL + '/orders', body);
  }
}
