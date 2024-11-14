import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../../../app-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    public http: HttpClient,
    private elementRef:ElementRef,
    // private commonService : CommonService,
    // private navigation : NavigationService,
    private fb : FormBuilder,
  ) { }

  // Tạo biến
  isValid = true;
  form !: FormGroup;

  login() {
    if (this.form.value.email && this.form.value.password) {
      this.http.post(AppConstants.BASE_URL_API + "/login", JSON.stringify(this.form.value)).subscribe(
        {
          next: (body: any) => {
            if (body && body?.accessToken && body?.tokenType) {
              sessionStorage.setItem("access_token", body?.accessToken);
              sessionStorage.setItem("token_type", body?.tokenType);
              this.router.navigate(['/home'])
            } else {  
              this.isValid = false;
            }
          },
          error: (error) => {
            console.error(error);
            this.router.navigate(['error'])
          }
        }
      );
    } else {
      this.isValid = false;
    }
  }
}
