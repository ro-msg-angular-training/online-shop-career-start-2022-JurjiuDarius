import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  public updateProduct(id: String, product: any): Observable<any> {
    return this.http.put(this.BASE_URL + '/products/' + id, product);
  }
  public addProduct(product: any): Observable<any> {
    return this.http.post(this.BASE_URL + '/products', product);
  }
}
