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

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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


}
