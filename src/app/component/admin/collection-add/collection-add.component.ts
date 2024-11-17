import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';

@Component({
  selector: 'app-collection-add',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent],
  templateUrl: './collection-add.component.html',
  styleUrl: './collection-add.component.css'
})
export class CollectionAddComponent {

}
