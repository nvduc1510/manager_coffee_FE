import { Component, ElementRef } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from "../../../shared/component/common/admin-topbar/admin-topbar.component";
import { AdminMenuComponent } from "../../../shared/component/common/admin-menu/admin-menu.component";
import { TitleMetaComponent } from "../../../shared/component/common/title-meta/title-meta.component";
import { HeaderCssComponent } from "../../../shared/component/common/header-css/header-css.component";
import { LoginComponent } from '../../ath/login/login.component';
import { PreloaderComponent } from '../../../shared/component/common/preloader/preloader.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express';
import { CollectionsService } from '../../../service/collections.service';
import { ProductService } from '../../../service/product.service';
import { TokenUtils } from '../../../shared/utils/token.utils';
import { CommonModule } from '@angular/common';
import { Collections } from '../../../model/Collection';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent, TitleMetaComponent, HeaderCssComponent,PreloaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private fb : FormBuilder,
    // private router : Router,
    // private elementRef : ElementRef,
    private collectionService : CollectionsService,
    private productService : ProductService
  ){}

  // Tạo biến
  searchForm !: FormGroup;
  errorMessage !: string;
  totalRecords : any;

  //user
  userLogging !: any;

  //collections
  listCollections : any[] = [];
  listCollectionId : any[] = [];
  collectionId : any;
  collectionName !: string;
  collectionImage !: string;

  //Products
  productMap : Map<number, any[]> = new Map<number, any[]>();
  listProducts : any[] = [];
  listTop5Products : any[] = [];
  showAllProduct : any;
  ordProductName = '';

  //pages 
  limit = 12;
  offset = 1;
  currentPage = 1;
  totalPage = 0;

  ngOnInit() : void {
    this.searchForm = this.fb.group({
      productName : [''],
      collectionId : [''],
    });
    this.checkIdLogin();
    this.getCollections();
    this.getTop5Product();
  }

  checkIdLogin(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        this.userLogging = decodedToken.user.userId;
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }

  //Lấy all collections
  getCollections(): void {
    this.collectionService.getCollections().subscribe({
      next: (response: any) => {
        console.log("thành công");
        
        this.listCollections = response.params || [];
        this.listCollectionId = this.listCollections.map(collection => collection.collectionId);
        // this.getAllGame();
      }, error: (err: any) => {
        this.errorMessage = err.message;
      }
    })
  }

  // Lấy product theo từng id của collections
  getCollectionById(collectionId: number): any[] {
    return this.productMap.get(collectionId) || [];
  }

  //Lấy all products của từng collections
  getProducts(): void {
    this.showAllProduct = true;
    this.listCollectionId.forEach(id => {
      const collectionId = id || this.searchForm.get('collection')?.value;
      this.productService.getProducts(
        this.searchForm.get('productName')?.value,
        collectionId,
        this.ordProductName,
        this.offset,
        this.limit).subscribe({
          next: (data: any) => {
            this.listProducts = data.params;
              this.totalRecords = data.total,
              this.totalPage = Math.ceil(data.totalRecords / this.limit),
            this.productMap.set(collectionId, this.listProducts);
          }, error: (err: any) => {
            console.error('Error:', err);
          }
        })
    })
  }

  viewAllGames(collectionId: number): void {
    this.showAllProduct = false;
    this.productService.getProducts(
      this.searchForm.get('productName')?.value,
      collectionId,
      this.ordProductName,
      this.offset,
      this.limit).subscribe({
        next: (data: any) => {
          this.listProducts = data.params;
          const collection = this.listCollections.find(c => c.collectionId === collectionId);
          this.collectionId = collection ? collection.collectionId : '';
          this.collectionName = collection ? collection.collectionName : '';
          this.totalRecords = data.total,
          this.totalPage = Math.ceil(data.totalRecords / this.limit)
        }, error: (err: any) => {
          console.error('Error:', err);
        }
      });
  }

  getTop5Product() : void {
    this.productService.getTop5Product().subscribe({
      next: (data: any) => {
        this.listTop5Products = data;
      }, error: (err: any) => {
        console.error('Error:', err);
      }
    });
  }

  getProductImage(image: string | null): string {
    return image ? `../../../../assets/images/product/${image}` : '../../../../assets/images/product/hot-chocolate.png';
  }



}
