import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './all-products/add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products-smart/all-products.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCartComponent } from './cart/components/shopping-cart/shopping-cart.component';
import { EditProductComponent } from './product-detail/components/edit-product/edit-product.component';
import { ProductDetailComponent } from './product-detail/components/product-detail-smart/product-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    component: AllProductsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add',
        component: AddProductComponent,
        data: { roles: ['admin'] },
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        children: [
          {
            path: 'edit',
            component: EditProductComponent,
            data: { roles: ['admin'] },
          },
        ],
      },
    ],
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard],
    data: { roles: ['customer'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
