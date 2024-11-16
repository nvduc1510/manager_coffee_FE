import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UpdateUser } from '../model/UpdateUser';
import { RegisterUser } from '../model/RegisterUser';
const httpOptions = {headers : new HttpHeaders ({ 'Content-Type' : 'application/json'})}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) { }

  getUserById(id : number) : Observable<any> {
    const url = AppConstants.BASE_URL_API + `/user/${id}`;
    return this.http.get<any>(url);
  }
  getAllUser(userFullName : string, ordUserFullName : string, offset : number, limit : number)
  : Observable<any> {
    const params = new HttpParams()
    .set('userFullName', userFullName ) 
    .set('ordUserFullName', ordUserFullName ) 
    .set('offset', offset )
    .set('limit', limit );
    return this.http.get<any>( AppConstants.BASE_URL_API + '/user/all', {params : params});
  }
  deleteUser(userId : number ) : Observable<any> {
    const url = AppConstants.BASE_URL_API + `/user/${userId}`;
    return this.http.delete(url);
  }
  updateUser(userDTO: UpdateUser, userId: number): Observable<any> {
    const url = AppConstants.BASE_URL_API + `/user/update/${userId}`;
    return this.http.put<any>(url, userDTO);
  }
  createUser (register : RegisterUser) : Observable<any> {
    const url = AppConstants.BASE_URL_API + '/register';
    return this.http.post<any>(url, register, httpOptions);
  }

  forgetPassword (resetPassword : RegisterUser) : Observable<any> {
    const url = AppConstants.BASE_URL_API + '/reset_password';
    return this.http.put<any>(url, resetPassword);
  }
}
