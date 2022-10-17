import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './all-products/all-products-smart/all-products.component';
import { ProductDetailComponent } from './product-detail/components/product-detail-smart/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './product-detail/components/edit-product/edit-product.component';
import { AllProductsDisplayComponent } from './all-products/all-products-display/all-products-display.component';
import { ProductDetailDisplayComponent } from './product-detail/components/product-detail-display/product-detail-display.component';
import { ShoppingCartDisplayComponent } from './cart/components/shopping-cart-display/shopping-cart-display.component';
import { EditProductDisplayComponent } from './edit-product-display/edit-product-display.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginDisplayComponent } from './auth/login-display/login-display.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { productDetailReducer } from './product-detail/state/product-detail-reducer';
import { ProductEffects } from './product-detail/state/product-detail-effects';
import { authReducer } from './auth/state/auth-reducers';
import { cartReducer } from './cart/state/cart-reducers';
import { AuthEffects } from './auth/state/auth-effects';
import { CartEffects } from './cart/state/cart-effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AllProductsEffects } from './all-products/state/all-products-effects';
import { allProductsReducer } from './all-products/state/all-products-reducers';

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
    LoginComponent,
    LoginDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('product', productDetailReducer),
    StoreModule.forFeature('auth', authReducer),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('products', allProductsReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      ProductEffects,
      AuthEffects,
      CartEffects,
      AllProductsEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
