import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AddToCartComponent } from './Component/add-to-cart/add-to-cart.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { LoginComponent } from './Component/login/login.component';
import { PlaceOrderComponent } from './Component/place-order/place-order.component';
import { RegisterComponent } from './Component/register/register.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'books', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  {path: 'addtocart', component: AddToCartComponent, canActivate: [AuthenticationGuard]},
  // {path: 'placeorder', component: PlaceOrderComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
