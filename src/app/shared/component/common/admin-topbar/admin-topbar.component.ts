import { Component } from '@angular/core';
import { PreloaderComponent } from "../preloader/preloader.component";

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [PreloaderComponent],
  templateUrl: './admin-topbar.component.html',
  styleUrl: './admin-topbar.component.css'
})
export class AdminTopbarComponent {

}
