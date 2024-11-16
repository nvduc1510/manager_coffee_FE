import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ValidateComponent } from '../model/validate/validate.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  private searchQuerySubject: BehaviorSubject<{ gameName: string; categoryId: any }> = new BehaviorSubject({
    gameName: '',
    categoryId: '',
  });
  public searchQuery$: Observable<{ gameName: string; categoryId: any }> = this.searchQuerySubject.asObservable();
  setSearchQuery(gameName: string, categoryId: number): void {
    const searchQuery = { gameName, categoryId };
    this.searchQuerySubject.next(searchQuery);
  }

  async createPlatform() : Promise<FormGroup<any>> {
    return this.fb.group({
       userId: [''],
       username: ['', [ValidateComponent.validateUsername]],
       userFullName: ['', ValidateComponent.validateUsername],
       email: [''],
       userSex: [''],
       userBirthdate: [''],
       userAddress: [''],
       userImage: [''],
       password: ['', [ValidateComponent.ValidPassword]],
       confirmPassword: ['', [ValidateComponent.validateConfirm]],
     }, {
       validators: ValidateComponent.ConfirmPassword
     });
   }
}
