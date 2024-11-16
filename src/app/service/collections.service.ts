import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConstants } from '../app-constants';
import { Collections } from '../model/Collection';
const httpOptions = {headers : new HttpHeaders ({ 'Content-Type' : 'application/json'})}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(
    private http : HttpClient
  ) { } 

  getCollections() : Observable<Collections>{
    const url = AppConstants.BASE_URL_API + "/collections/getAll";
      return this.http.get<Collections>(url)
  }

  getCategoryById(collectionId: number): Observable<Collections> {
    const url = AppConstants.BASE_URL_API + `/collections/detail/${collectionId}`;
    return this.http.get<Collections>(url);
  }
}
