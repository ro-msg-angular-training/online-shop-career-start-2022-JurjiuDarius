import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../classes';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.sass']
})
export class AllProductsComponent implements OnInit {

  products:Observable<Product[]>|undefined;

  constructor(private productService:ProductService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.products=this.productService.getProducts();
  }

  

}
