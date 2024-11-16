import { Routes } from '@angular/router';
import { LoginComponent } from './component/ath/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import { AuthorizeGuard } from './shared/auth/authorize.guard';
import { ProductComponent } from './component/admin/product/product.component';
import { ProductAddComponent } from './component/admin/product-add/product-add.component';
import { ProfileComponent } from './component/user/profile/profile.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthorizeGuard]},
    { path: 'product', component: ProductComponent, canActivate: [AuthorizeGuard]},
    { path: 'product_add', component: ProductAddComponent, canActivate: [AuthorizeGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthorizeGuard]}
];
