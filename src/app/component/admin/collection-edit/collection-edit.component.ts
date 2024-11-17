import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from '../../../shared/component/common/admin-topbar/admin-topbar.component';
import { AdminMenuComponent } from '../../../shared/component/common/admin-menu/admin-menu.component';

@Component({
  selector: 'app-collection-edit',
  standalone: true,
  imports: [CommonModule, FooterComponent, AdminTopbarComponent, AdminMenuComponent],
  templateUrl: './collection-edit.component.html',
  styleUrl: './collection-edit.component.css'
})
export class CollectionEditComponent {

}
