import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { TokenUtils } from '../../../shared/utils/token.utils';
import { User } from '../../../model/User';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUser } from '../../../model/UpdateUser';
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import { NavigationService } from '../../../service/navigation.service';
import { ValidateComponent } from '../../../model/validate/validate.component';
import * as countries from 'country-list';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent,ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {

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
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      username : [''],
      userFullName : ['',ValidateComponent.ValidateUserFullName],
      email : ['',ValidateComponent.ValidEmaill],
      userSex : [''],
      userBirthdate : [''],
      userAddress : [''],
      userImage : ['']
    })
    this.listCountry = countries.getNames();

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
  
  addUser() : void {
    const data = this.dataForm.value;
    this.userService.createUser(data).subscribe({
      next : (data : any) => {
        alert(this.successMessage = "Thành công");
        this.navigationUserList();
      }
    })
  }
  navigationUserList() : void {
    this.navigationService.navigationUserList();
  }

}
