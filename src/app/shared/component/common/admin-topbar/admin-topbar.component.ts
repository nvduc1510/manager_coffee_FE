import { Component } from '@angular/core';
import { PreloaderComponent } from "../preloader/preloader.component";
import { TokenUtils } from '../../../utils/token.utils';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../../../service/navigation.service';

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [PreloaderComponent,CommonModule],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.css'
})
export class AdminTopbarComponent {
  // Tạo biến
  userLogging : any;
  userRole : any;
  userFullName : any;
  isMenuOpen: boolean = false;

  constructor(private router: Router,
    private navigationService : NavigationService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit() : void {
    this.checkIdLogin();
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('token_type');
    this.router.navigate(['login']);
    return false;
  }

  checkIdLogin(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        this.userLogging = decodedToken.user.userId;
        this.userRole = decodedToken.user.userRole.roleName;
        this.userFullName = decodedToken.user.userFullName;
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }

  navigationProfile() : void {
    this.navigationService.navigationProfile();
  }
}
