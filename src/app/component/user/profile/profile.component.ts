import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ValidateComponent } from '../../../model/validate/validate.component';
import { User } from '../../../model/User';
import { CommonService } from '../../../service/common.service';
import { UserService } from '../../../service/user.service';
import { TokenUtils } from '../../../shared/utils/token.utils';
import * as countries from 'country-list';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  // Tạo biến
  inf : any;
  users !: User;
  userId !: number;
  userFullName !: string;
  username !: string;
  email !: string;
  userSex !: string;
  userBirthdate !: string;
  userAddress !: string;
  userRoleId !: string;
  userRoleName !: string;

  searchForm !: FormGroup;
  dataForm !: FormGroup;

  //boolean
  disableEmail: boolean = false;

  //message
  successMessage: any;
  errorMessage: any;

  listCountry: string[] = [];


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService : CommonService,
    private userService : UserService
  ){}

  ngOnInit() : void {
    this.disableEmail = true;
    this.listCountry = countries.getNames();
    

    this.searchForm = this.fb.group({
      userName: [''],
      productName: [''],
      collectionName: [''],
    });
    this.jwtDecoded();
  }
  jwtDecoded(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        // this.userInfo = decodedToken.user;
        this.userId = decodedToken.user.userId;
        this.getDetailUser(this.userId);
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }

  //search thông tin
  searchInformation(): void {
    this.commonService.searchQuery$.subscribe(res => {
      if (res) {
        this.searchForm.patchValue(res);
      }
    });
  }
  
  getDetailUser(id: number): void {
    if (!id) {
      console.error("Invalid user ID");
      return;
    }
    this.userService.getUserById(id).subscribe({
      next: (data: any) => {
        if (data?.params) {
          this.users = data.params;
          this.userFullName = this.users.userFullName;
          this.username = this.users.username;
          this.email = this.users.email;
          this.userSex = this.users.userSex;
          this.userBirthdate = this.users.userBirthdate;
          this.userAddress = this.users.userAddress;
          
        }
      },
      error: (error: any) => {
        console.error("Error fetching user details", error);
        alert("Unable to fetch user details.");
      }
    });
  }
  
  updateUser(): void {
    if (this.dataForm.valid) {
      const userData = this.dataForm.value;
      this.userService.updateUser(userData, this.userId).subscribe({
        next: data => {
          if (data?.message) {
            this.successMessage = data.message;
            alert(this.successMessage);
            // Đưa ra quyết định liệu có reload trang hay không, hoặc chuyển hướng trang sau khi cập nhật
            window.location.reload(); // Cẩn thận với việc reload trang, có thể gây ảnh hưởng đến UX
          }
        },
        error: error => {
          if (error?.message) {
            this.errorMessage = error.message;
            alert(this.errorMessage);
          }
        }
      });
    } else {
      this.handlePasswordValidation();
      this.markControlDirtyTouched(this.dataForm);
    }
  }
  
  handlePasswordValidation() {
    const password = this.dataForm.get('password');
    const confirmPassword = this.dataForm.get('confirmPassword');
    if (password?.value === '') {
      password?.clearValidators();
      confirmPassword?.clearValidators();
    } else {
      password?.setValidators([ValidateComponent.ValidPassword]);
      confirmPassword?.setValidators([ValidateComponent.validateConfirm]);
    }
    password?.updateValueAndValidity();
    confirmPassword?.updateValueAndValidity();
  }
  
  markControlDirtyTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup) {
        this.markControlDirtyTouched(control);
      } else {
        if (!control.dirty && !control.touched) {
          control.markAllAsTouched();
        }
      }
    });
  }
  
  getUserById(userId: number): void {
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }
    this.userService.getUserById(userId).subscribe({
      next: (data: any) => {
        if (data?.params) {
          this.dataForm.patchValue(data.params);
          this.userId = data.params.userId;
        }
      },
      error: (error: any) => {
        console.error("Error fetching user details", error);
        alert("Unable to fetch user details.");
      }
    });
  }
  
}
