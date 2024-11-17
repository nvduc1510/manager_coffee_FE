import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
  ) { }

  navigationListProduct(): void {
    localStorage.clear();
    this.router.navigate(['/product']);
  }

  navigationProductAdd(): void {
    localStorage.clear();
    this.router.navigate(['/product_add']);
  }

  navigationProductDetail(productId : number) : void {
    localStorage.clear();
    this.router.navigate(['/product_detail',productId]);
  }

  navigationProductEdit() : void {
    localStorage.clear();
    this.router.navigate(['/product_edit']);
  }

  navigationCollectionList() : void {
    localStorage.clear();
    this.router.navigate(['/collection_list']);
  }

  navigationCollectionAdd() : void {
    localStorage.clear();
    this.router.navigate(['/collection_add']);
  }

  navigationCollectionDetail(collectionId : number) : void {
    localStorage.clear();
    this.router.navigate(['/collection_detail', collectionId]);
  }

  navigationCollectionEdit() : void{
    localStorage.clear();
    this.router.navigate(['/collection_edit']);
  }

  navigationHome(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  navigationProfile(): void {
    localStorage.clear();
    this.router.navigate(['/profile']);
  }

  navigationPage404() :void {
    localStorage.clear();
    this.router.navigate(['/page_404']);
  }

  navigationUserList() : void {
    localStorage.clear();
    this.router.navigate(['/user_list']);
  }

  navigationUserAdd() : void {
    localStorage.clear();
    this.router.navigate(['/user_add']);
  }

  navigationUserEdit(userId : number) : void {
    localStorage.clear();
    this.router.navigate(['/user_edit', userId]);
  }


}
