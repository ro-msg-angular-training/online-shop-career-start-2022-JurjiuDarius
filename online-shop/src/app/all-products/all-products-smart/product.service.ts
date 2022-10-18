import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../classes/product';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL + '/products');
  }

  public getProductById(id: String): Observable<Product> {
    return this.http.get<Product>(this.BASE_URL + '/products/' + id);
  }

  public deleteProductById(id: String): Observable<any> {
    return this.http.delete(this.BASE_URL + '/products/' + id);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      this.BASE_URL + '/products/' + product.id,
      product
    );
  }
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL + '/products', product);
  }
}
