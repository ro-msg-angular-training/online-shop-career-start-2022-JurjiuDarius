import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AddProductComponent } from './all-products/add-product/add-product.component';
import { AllProductsDisplayComponent } from './all-products/all-products-display/all-products-display.component';
import { AllProductsComponent } from './all-products/all-products-smart/all-products.component';
import { AllProductsEffects } from './all-products/state/all-products-effects';
import { allProductsReducer } from './all-products/state/all-products-reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginDisplayComponent } from './auth/login-display/login-display.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthEffects } from './auth/state/auth-effects';
import { authReducer } from './auth/state/auth-reducers';
import { ShoppingCartDisplayComponent } from './cart/components/shopping-cart-display/shopping-cart-display.component';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { CartEffects } from './cart/state/cart-effects';
import { cartReducer } from './cart/state/cart-reducers';
import { EditProductDisplayComponent } from './product-detail/components/edit-product-display/edit-product-display.component';
import { EditProductComponent } from './product-detail/components/edit-product/edit-product.component';
import { ProductDetailDisplayComponent } from './product-detail/components/product-detail-display/product-detail-display.component';
import { ProductDetailComponent } from './product-detail/components/product-detail-smart/product-detail.component';
import { ProductEffects } from './product-detail/state/product-detail-effects';
import { productDetailReducer } from './product-detail/state/product-detail-reducer';

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
    FlexLayoutModule,
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
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
