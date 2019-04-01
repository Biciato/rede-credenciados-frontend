import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';

import { CredenciadosComponent } from './credenciados/credenciados.component';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { SidenavAdminComponent } from './sidenav-admin/sidenav-admin.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SlideShowComponent } from './slide-show/slide-show.component';

@NgModule({
  imports: [
      CommonModule,
      DashboardAdminRoutingModule,
      SharedModule,
      ReactiveFormsModule
  ],
  declarations: [
      CredenciadosComponent,
      DashboardAdminComponent,
      SidenavAdminComponent,
      EspecialidadesComponent,
      NewsletterComponent,
      SlideShowComponent
  ],
  exports: [
      CredenciadosComponent,
      DashboardAdminComponent,
      SidenavAdminComponent
  ]
})
export class DashboardAdminModule { }
