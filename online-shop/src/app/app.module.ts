import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AllProductsDisplayComponent } from './all-products-display/all-products-display.component';
import { ProductDetailDisplayComponent } from './product-detail-display/product-detail-display.component';
import { ShoppingCartDisplayComponent } from './shopping-cart-display/shopping-cart-display.component';
import { EditProductDisplayComponent } from './edit-product-display/edit-product-display.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    EditProductComponent,
    AllProductsDisplayComponent,
    ProductDetailDisplayComponent,
    ShoppingCartDisplayComponent,
    EditProductDisplayComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
