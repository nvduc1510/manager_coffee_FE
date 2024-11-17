import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';
import { NavigationService } from '../../../service/navigation.service';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/Product';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { UpdateProduct } from '../../../model/updateProduct';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  //Tạo biến
  productId !: number;
  product !: UpdateProduct;
  dataForm !: FormGroup;

  //message
  successMessage !: string;
  errMessage !: string;

  //url
  imgUrl = "../../../../assets/images/product/";

  constructor(
    private navigationService : NavigationService,
    private productService : ProductService,
    private route : ActivatedRoute,
    private commonService : CommonService,
  ){}

  createFormGroup(): void {
    this.commonService.createPlatformProduct().then((formGroup) => {
      this.dataForm = formGroup;
    }).catch((error) => {
      console.log('Error while creating form group', error);
    })
  }

  ngOnInit() : void {
    this.getProductIdFormUrl();
    this.detailProduct();
  }

  // Lấy id từ url
  getProductIdFormUrl() : void {
    this.route.params.subscribe(params => {
      if(params['productId'] != 0) {
        this.productId = params['productId'];
      } else {
        this.navigationService.navigationPage404();
      }
    });
  }

  // Lấy thông tin thông qua id
  detailProduct() : void {
    this.productService.getProductDetail(this.productId).subscribe({
      next : (res : any) => {
        this.product = res.params;
        this.dataForm.patchValue(this.product);
      }
    })
  }

  updateProduct() : void {
    if (this.dataForm.valid) {
      const productData = this.dataForm.value;
      this.productService.updateProduct(this.productId, productData).subscribe({
        next : (res : any) => {
          this.successMessage = res.message;
          alert(this.successMessage);
          window.location.reload();
        }, error: error => {
          if (error?.message) {
            this.errMessage = error.message;
            alert(this.errMessage);
          }
        }
      })

    }

  }

}
