import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav-admin',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav-admin.component.scss']
})

export class SidenavAdminComponent {
  isToggled = false;

  constructor() {}

  toggleMenu(menuTarget) {
    menuTarget === true ? this.isToggled = !this.isToggled : this.isToggled = false;
  }

}
