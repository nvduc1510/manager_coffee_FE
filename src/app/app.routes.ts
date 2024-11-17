import { Routes } from '@angular/router';
import { LoginComponent } from './component/ath/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import { AuthorizeGuard } from './shared/auth/authorize.guard';
import { ProductComponent } from './component/admin/product/product.component';
import { ProductAddComponent } from './component/admin/product-add/product-add.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { ProductDetailComponent } from './component/admin/product-detail/product-detail.component';
import { UserListComponent } from './component/admin/user-list/user-list.component';
import { UserAddComponent } from './component/admin/user-add/user-add.component';
import { ProductEditComponent } from './component/admin/product-edit/product-edit.component';
import { CollectionListComponent } from './component/admin/collection-list/collection-list.component';
import { CollectionEditComponent } from './component/admin/collection-edit/collection-edit.component';
import { CollectionAddComponent } from './component/admin/collection-add/collection-add.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthorizeGuard]},
    { path: 'product', component: ProductComponent, canActivate: [AuthorizeGuard]},
    { path: 'product_add', component: ProductAddComponent, canActivate: [AuthorizeGuard]},
    { path: 'product_detail/:productId', component: ProductDetailComponent, canActivate: [AuthorizeGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthorizeGuard]},
    { path: 'page_404', component: ProfileComponent},
    { path: 'user_list', component: UserListComponent, canActivate: [AuthorizeGuard]},
    { path: 'user_add', component: UserAddComponent, canActivate: [AuthorizeGuard]},
    { path: 'user_edit', component: UserAddComponent, canActivate: [AuthorizeGuard]},
    { path: 'product_edit', component: ProductEditComponent, canActivate: [AuthorizeGuard]},
    { path: 'collection_list', component: CollectionListComponent, canActivate: [AuthorizeGuard]},
    { path: 'collection_edit', component: CollectionEditComponent, canActivate: [AuthorizeGuard]},
    { path: 'collection_add', component: CollectionAddComponent, canActivate: [AuthorizeGuard]},

];
