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

  navigationHome(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  navigationProfile(): void {
    localStorage.clear();
    this.router.navigate(['/profile']);
  }
}
