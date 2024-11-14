import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/component/common/footer/footer.component';
import { AdminTopbarComponent } from "../../../shared/component/common/admin-topbar/admin-topbar.component";
import { AdminMenuComponent } from "../../../shared/component/common/admin-menu/admin-menu.component";
import { TitleMetaComponent } from "../../../shared/component/common/title-meta/title-meta.component";
import { HeaderCssComponent } from "../../../shared/component/common/header-css/header-css.component";
import { LoginComponent } from '../../ath/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, AdminTopbarComponent, AdminMenuComponent, TitleMetaComponent, HeaderCssComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
