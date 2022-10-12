import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly BASE_URL = 'http://localhost:3000';
  selectedProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  addProductToCart(product: Product) {
    let alreadyExists = this.selectedProducts.find(function (element) {
      return element.id == product.id;
    });

    if (alreadyExists === undefined) {
      product.quantity = 1;
      this.selectedProducts?.push(product);
    } else {
      alreadyExists.quantity += 1;
    }
  }
  public getSelectedProducts(): Product[] {
    return this.selectedProducts;
  }
  public checkOut(): Observable<Product[]> {
    let productTemplateList = [];
    for (let product of this.selectedProducts) {
      let productTemplate = {
        productId: product.id,
        quantity: product.quantity,
      };
      productTemplateList.push(productTemplate);
    }

    let body = { customer: 'blackj', products: productTemplateList };

    return this.http.post<Product[]>(this.BASE_URL + '/orders', body);
  }
  public clearCart() {
    this.selectedProducts = [];
  }
}
