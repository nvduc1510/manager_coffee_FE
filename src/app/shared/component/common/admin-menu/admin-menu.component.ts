import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../../service/navigation.service';


@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {

  constructor(
    private navigationService : NavigationService
  ){}

  menuStates: { [key: string]: boolean } = {};

  // Hàm để toggle trạng thái menu theo id
  toggleMenu(id: string): void {
    // Nếu menu chưa có trong đối tượng menuStates thì khởi tạo với giá trị false
    if (this.menuStates[id] === undefined) {
      this.menuStates[id] = false;
    }

    // Đảo ngược trạng thái của menu theo id
    this.menuStates[id] = !this.menuStates[id];
  }

  // Kiểm tra trạng thái của menu theo id
  isMenuOpen(id: string): boolean {
    return this.menuStates[id] || false;
  }

  navigationProduct(): void {
    this.navigationService.navigationListProduct();
  }

  navigationHome(): void {
    this.navigationService.navigationHome();
  }
  navigationProductAdd(): void {
    this.navigationService.navigationProductAdd();
  }

  navigationUserAdd() : void {
    this.navigationService.navigationUserAdd();
  }

  navigationUserList() : void {
    this.navigationService.navigationUserList();
  }

  navigationUserEdit() : void {
    this.navigationService.navigationUserEdit();
  }

  navigationCollectionList(): void {
    this.navigationService.navigationCollectionList();
  }

  navigationCollectionAdd(): void {
    this.navigationService.navigationCollectionAdd();
  }



  navigationCollectionEdit(): void {
    this.navigationService.navigationCollectionEdit();
  }

}
