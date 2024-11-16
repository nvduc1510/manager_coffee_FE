import { Routes } from '@angular/router';
import { LoginComponent } from './component/ath/login/login.component';
import { HomeComponent } from './component/home/home/home.component';
import { AuthorizeGuard } from './shared/auth/authorize.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthorizeGuard]},
];
