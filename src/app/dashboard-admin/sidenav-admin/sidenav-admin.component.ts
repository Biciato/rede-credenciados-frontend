import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav-admin.component.scss']
})

export class SidenavAdminComponent {
  isToggledFinancial = false;
  isToggledCom = false;

  constructor() {}

  toggleMenu(menuTarget) {
    if (menuTarget === 'com') {
      this.isToggledFinancial = false;
      this.isToggledCom = !this.isToggledCom
    } else if (menuTarget === 'financial') {
      this.isToggledCom = false;
      this.isToggledFinancial = !this.isToggledFinancial
    } else {
      this.isToggledCom = false;
      this.isToggledFinancial = false;
    }
  }

}
