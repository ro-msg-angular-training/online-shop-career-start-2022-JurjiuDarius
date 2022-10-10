import { Injectable } from '@angular/core';
import { Product } from './classes';
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
    console.log('getproductCalled');
  }

  public deleteProductById(id: String): void {
    this.http
      .delete(this.BASE_URL + '/products/' + id)
      .subscribe((res) => console.log(res));
  }
}
