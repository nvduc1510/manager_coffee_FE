import { Component } from '@angular/core';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionsService } from '../../../service/collections.service';
import { ProductService } from '../../../service/product.service';
import { CommonModule } from '@angular/common';
import { TokenUtils } from '../../../shared/utils/token.utils';
import { NavigationService } from '../../../service/navigation.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AdminTopbarComponent, AdminMenuComponent,FooterComponent,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  constructor(
    private fb : FormBuilder,
    // private router : Router,
    // private elementRef : ElementRef,
    private collectionService : CollectionsService,
    private productService : ProductService,
    private navigationService : NavigationService
  ){}
   // Tạo biến
  searchForm !: FormGroup;
  errorMessage !: string;
  successMessage !: string;
  totalRecords : any;

  isAdmin : any;

  //user
  userLogging : any;
  userName !: string;

  //collections
  listCollections : any[] = [];
  listCollectionId : any[] = [];
  collectionId : any;
  collectionName !: string;
  collectionImage !: string;

  //Products
  productMap : Map<number, any[]> = new Map<number, any[]>();
  listProducts : any[] = [];
  showAllProduct : any;
  ordProductName = '';
  productImage : any;

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
    this.getProducts();
    this.checkIdLogin();
  }

  getProducts(): void {
    this.productService.getProducts(
      this.searchForm.get('productName')?.value,
      this.searchForm.get('collectionId')?.value,
      this.ordProductName,
      this.offset,
      this.limit).subscribe({ 
        next: (data: any) => {
          this.listProducts = data.params;
          this.listProducts.forEach(product => {
            const { displayText, badgeClass } = this.getDisplayTextAndColor(product.deleteFlag);
            product.displayText = displayText;
            product.badgeClass = badgeClass;
          });
          this.totalRecords = data.total,
          this.totalPage = Math.ceil(data.totalRecords / this.limit)
        }, error: (err: any) => {
          console.error('Error:', err);
        }
      })
  }
  getProductImage(image: string | null): string {
    return image ? `../../../../assets/images/product/${image}` : '../../../../assets/images/product/hot-chocolate.png';
  }

  getDisplayTextAndColor(deleteFlag: number): { displayText: string, badgeClass: string } {
    if (deleteFlag === 0) {
      return { 
        displayText: 'Publish', 
        badgeClass: 'inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500' 
      };  // Publish với màu xanh
    } else if (deleteFlag === 1) {
      return { 
        displayText: 'Draft', 
        badgeClass: 'inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium bg-red-500/20 text-red-500' 
      };  // Draft với màu đỏ
    } else {
      return { 
        displayText: 'Unknown', 
        badgeClass: 'inline-flex items-center gap-1 py-0.5 px-2.5 rounded-full text-xs font-medium bg-gray-500/20 text-gray-500' 
      };  // Màu xám nếu không phải 1 hoặc 2
    }
  }


  checkIdLogin(): void {
    const userToken = sessionStorage.getItem('access_token');
    if (userToken) {
      const decodedToken = TokenUtils.parseJwt(userToken);
      if (decodedToken) {
        this.userLogging = decodedToken.user.userId;
        this.userName = decodedToken.user.userFullName;
        this.isAdmin = decodedToken.user.userRole.userRoleId === 1;
      } else {
        console.error('Invalid token or unable to decode.');
      }
    }
  }

  deleteProduct(productId : number) : void {
    this.productService.deleteProduct(productId).subscribe({
      next: (data : any) => {
        this.successMessage = data.message;
        alert(this.successMessage);
        window.location.reload();
      }, error : (err : any) => {
        this.errorMessage = err.message;
        alert(this.errorMessage);
        window.location.reload();
      }
    })
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

  navigationProductAdd() : void {
    this.navigationService.navigationProductAdd();
  }
  navigationProDetail(productId : number) : void {
    this.navigationService.navigationProductDetail(productId); 
  }
}
