import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/service/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { TokenUtils } from 'src/app/shared/utils/token.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  gameName: string = '';
  categoryId: any;
  errorMes : string ='';
  arrCategory : Category[] = [];
  searchForm!: FormGroup;
  idLogin : number =0;
  userName : string = '';
  constructor(
    private router: Router,
    private commonService: CommonService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private navigationSerivce : NavigationService
  ){}
  ngOnInit():void {
    this.searchForm = this.fb.group({
      gameName: [''], // Khai báo và khởi tạo giá trị mặc định nếu cần
      categoryId: [''], // Khai báo và khởi tạo giá trị mặc định nếu cần
    });
    this.getAllCategory();
    this.checkIdLogin();
  }

  search(): void {
    this.commonService.setSearchQuery(this.searchForm.value.gameName, this.searchForm.value.categoryId);    
  }
  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['login']);
    return false;
  }
  scrollToTop() {
    window.scrollTo({top : 0, behavior: 'smooth'})
  }
  getAllCategory(): void {
    this.categoryService.getAllCompany().subscribe({
      next: (response: any) => {
        this.arrCategory = response.params;               
      }, error: (err: any) => {
        this.errorMes = err.message;
      }
    })
  }
  navigateToProfile() : void {
    this.navigationSerivce.navigateToProfile();
  }
  checkIdLogin(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        this.idLogin = decodedToken.user.userId;
        this.userName = decodedToken.user.userFullName;
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }
}
