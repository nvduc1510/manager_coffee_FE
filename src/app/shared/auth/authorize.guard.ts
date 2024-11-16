import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


import { TokenUtils } from '../utils/token.utils';
import { SessionStorageService } from '../../service/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard  {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sessionStorageService : SessionStorageService
    
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Kiểm tra token từ sessionStorage
    const token = this.sessionStorageService.getItem('access_token');
    
    if (token) {
      const payload = TokenUtils.parseJwt(token);
      
      // Kiểm tra nếu token hết hạn
      if (!payload || Date.now() >= payload.exp * 1000) {
        this.sessionStorageService.removeItem('access_token');
        this.router.navigate(['login']);
        return false;
      }

      // Kiểm tra quyền
      const expectedRole = route.data && route.data['expectedRole'];
      if (expectedRole && payload.role !== expectedRole) {
        this.router.navigate(['unauthorized']);
        return false;
      }

      return true; // Người dùng có quyền hợp lệ
    }

    // Chuyển hướng đến trang login nếu không có token
    this.router.navigate(['login']);
    return false;
  }

}