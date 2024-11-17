import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import { UpdateUser } from '../../../model/UpdateUser';
import { User } from '../../../model/User';
import { TokenUtils } from '../../../shared/utils/token.utils';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent,ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  //Tạo biến
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private elementRef: ElementRef,
    private commonService: CommonService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      userId : [''],
      username : [''],
      userFullName : [''], 
      email : [''],
      userSex : [''],
      userBirthdate : [''],
      userAddress : [''],
      userImage : [''],
      password : [''],
      confirmPassword : ['']
    })
    this.getAllUser();
    this.dataForm.controls['userFullName'].valueChanges.subscribe(value => {
      this.search(); // Gọi search mỗi khi giá trị thay đổi
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
  getAllUser(): void {
    this.userService.getAllUser(
      this.dataForm.get('userFullName')?.value,
      this.ordUserFullName,
      this.offset,
      this.limit
    ).subscribe({
      next: (data) => {
        this.listUser = data.params;
        this.totalRecords = data.total;
        this.totalPage = Math.ceil(this.totalRecords / this.limit);        
      },error:(error) =>{
        this.errorMessage = error.mesage;
      console.log(this.errorMessage);
      }
    })
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
        this.userId = data.params.userId;
      }
    })
  }
  
  search() : void {
    this.userFullName = this.dataForm.controls['userFullName'].value;
    this.getAllUser();
  }
  onSortChange(column : string) {
    if (column === 'userFullName') {
      if (this.ordUserFullName === 'asc') {
        this.ordUserFullName = 'desc';
      } else {
        this.ordUserFullName = 'asc';
      }
    }
    this.getAllUser();
  }
  onFileSelected(event : any) {
    const file: File = event.target.files[0];
    this.dataForm.patchValue({
      userImage: file
    });
  }
  moveToPage(pageNumber : number) : void {
    this.offset =(pageNumber - 1) * this.limit;
    this.currentPage = pageNumber;
    this.getAllUser();
  }

  navigationUserAdd() : void {
    this.navigationService.navigationUserAdd();
  }

  navigationUserDetail(productId : number) : void {
    this.navigationService.navigationUserEdit(productId); 
  }

  isConfirmDialogOpen = false;
  selectedProductId: number | null = null;

  openConfirmDialog(productId: number) {
    this.selectedProductId = productId;
    this.isConfirmDialogOpen = true;
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
  }

}
