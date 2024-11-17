import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../model/User';
import { UpdateUser } from '../../../model/UpdateUser';
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import { NavigationService } from '../../../service/navigation.service';
import { ValidateComponent } from '../../../model/validate/validate.component';
import { TokenUtils } from '../../../shared/utils/token.utils';
import { ActivatedRoute } from '@angular/router';
import * as countries from 'country-list';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  userIdLogin: any;
  userFullName: any;
  ordUserFullName = '';
  offset = 1;
  limit = 10;
  dataForm !: FormGroup;
  listUser: User[] = [];
  totalRecords: any;
  currentPage = 1;
  totalPage = 0;
  errorMessage: any;
  successMessage: any;
  userId : any;
  usersUpdate !: UpdateUser;

  listCountry: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private elementRef: ElementRef,
    private commonService: CommonService,
    private navigationService: NavigationService,
    private route : ActivatedRoute
  ) { }

  createFormGroup(): void {
    this.commonService.createPlatform().then((formGroup) => {
      this.dataForm = formGroup;
    }).catch((error) => {
      console.log('Error while creating form group', error);
    })
  }

  ngOnInit(): void {
    // this.dataForm = this.fb.group({
    //   userId : [''],
    //   username : [''],
    //   userFullName : [''], 
    //   email : [''],
    //   userSex : [''],
    //   userBirthdate : [''],
    //   userAddress : [''],
    //   userImage : ['']
    // })
    this.createFormGroup()
    this.getUserIdFormUrl();
    this.listCountry = countries.getNames();
  }

  getUserIdFormUrl() : void {
    this.route.params.subscribe(params => {
      if(params['userId'] != 0) {
        this.userId = params['userId'];
        this.getUserById(this.userId);
      } else {
        this.navigationService.navigationPage404();
      }
    });
  }

  
  checkIdLogin(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        this.userIdLogin = decodedToken.user.userId;
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }

  deleteUser (userId : number) : void  {
    this.userService.deleteUser(userId).subscribe((data) => {
      alert(this.successMessage = data.message);
      window.location.reload();
    })
  }

  getUserById(userId : number) : void {
    this.userService.getUserById(userId).subscribe({
      next: (data: any) => {
        this.dataForm.patchValue(data.params);
      }
    })
  }
  
  updateUser(): void {
    if (this.dataForm.valid) {
      const userData = this.dataForm.value;
      this.userService.updateUser(userData, this.userId).subscribe({
        next: data => {
          if (data?.message) {
            this.successMessage = data.message;
            alert(this.successMessage);
            this.navigationUserList();
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

  navigationUserAdd() : void {
    this.navigationService.navigationUserAdd();
  }

  navigationUserList() : void {
    this.navigationService.navigationUserList();
  }

}
