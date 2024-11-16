import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Page } from '../model/Page';
const httpOptions = {header : new HttpHeaders ({'Content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getProducts (productName : string, collectionId : number, ordProductName : string, offset : number, limit : number)
  : Observable<Page> {
    const params = new HttpParams()
    .set('productName', productName ) 
    .set('collectionId', collectionId ) 
    .set('ordProductName', ordProductName)
    .set('offset', offset )
    .set('limit', limit );
    return this.http.get<any>( AppConstants.BASE_URL_API + '/product/getAll', {params : params});
  } 
}
