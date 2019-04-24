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
import { ResumeComponent } from './resume/resume.component';
import { CommunicationComponent } from './communication/communication.component';
import { MessagesAdminComponent } from './messages-admin/messages-admin.component';
import { FinancialComponent } from './financial/financial.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { ClientsComponent } from './clients/clients.component';
import { ResumeIndicationComponent } from './resume-indication/resume-indication.component';

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
      SlideShowComponent,
      ResumeComponent,
      CommunicationComponent,
      MessagesAdminComponent,
      FinancialComponent,
      MyInfoComponent,
      ClientsComponent,
      ResumeIndicationComponent
  ],
  exports: [
      CredenciadosComponent,
      DashboardAdminComponent,
      SidenavAdminComponent
  ]
})
export class DashboardAdminModule { }
