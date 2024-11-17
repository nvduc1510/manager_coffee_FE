import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { Page } from '../model/Page';
import { UpdateProduct } from '../model/updateProduct';
const httpOptions = {header : new HttpHeaders ({'Content-Type': 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }
  // top-products
  getProducts (productName : string, collectionId : number, ordProductName : string, offset : number, limit : number)
  : Observable<Page> {
    const params = new HttpParams()
    .set('productName', productName ) 
    .set('collectionId', collectionId.toString() ) 
    .set('ordProductName', ordProductName)
    .set('offset', offset )
    .set('limit', limit );
    return this.http.get<any>( AppConstants.BASE_URL_API + '/product/getAll', {params : params});
  }

  getTop5Product ()
  : Observable<any> {
    return this.http.get<any>( AppConstants.BASE_URL_API + '/product/top-products');
  } 

  deleteProduct(productId : number ) : Observable<any> {
    const url = AppConstants.BASE_URL_API + `/product/delete/${productId}`;
    return this.http.delete(url);
  }

  getProductDetail(productId : number) : Observable<any> {
    const url = AppConstants.BASE_URL_API + `/product/detail/${productId}`;
    return this.http.get<any>(url);
  }

  updateProduct(productId : number, product : UpdateProduct) : Observable<any> {
    const url = AppConstants.BASE_URL_API + `/product/update/${productId}`;
    return this.http.put(url, product);
  }
}
