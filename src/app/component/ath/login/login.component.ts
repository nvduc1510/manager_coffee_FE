import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../../../app-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    private cdr: ChangeDetectorRef
  ) { }

  // Tạo biến
  isValid = true;
  form !: FormGroup;

  ngOnInit() : void {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  // login() {
  //   if (this.form.value.email && this.form.value.password) {
  //     this.http.post(AppConstants.BASE_URL_API + "/login", JSON.stringify(this.form.value)).subscribe(
  //       {
  //         next: (body: any) => {
  //           if (body && body?.accessToken && body?.tokenType) {
  //             sessionStorage.setItem("access_token", body?.accessToken);
  //             sessionStorage.setItem("token_type", body?.tokenType);
  //             console.log("Thành công")
  //             // this.router.navigate(['/home'])
  //           } else {  
  //             this.isValid = false;
  //             console.log("Thất bại")
  //           }
  //         },
  //         error: (error) => {
  //           console.error(error);
  //           // this.router.navigate(['error'])
  //         }
  //       }
  //     );
  //   } else {
  //     this.isValid = false;
  //   }
  // }
  login() {
    if (this.form.value.email && this.form.value.password) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<any>(`${AppConstants.BASE_URL_API}/login`, JSON.stringify(this.form.value), { headers })
            .subscribe({
                next: (body) => {
                    if (body?.accessToken && body?.tokenType) {
                        sessionStorage.setItem("access_token", body.accessToken);
                        sessionStorage.setItem("token_type", body.tokenType);
                        // this.cdr.detectChanges();
                        this.router.navigate(['/home']);
                        console.log("Login successful");
                    } else {
                        this.isValid = false;
                    }
                },
                error: (error) => {
                    console.error("Login failed", error);
                    this.router.navigate(['error']);
                }
            });
    } else {
        this.isValid = false;
    }
}
}
