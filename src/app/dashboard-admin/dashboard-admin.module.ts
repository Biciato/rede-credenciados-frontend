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
import { MyInfoComponent } from './my-info/my-info.component';
import { ClientsComponent } from './clients/clients.component';
import { ResumeIndicationComponent } from './resume-indication/resume-indication.component';
import { ToPayComponent } from './financial/to-pay/to-pay.component';
import { ToReceiveComponent } from './financial/to-receive/to-receive.component';
import { FluxComponent } from './financial/flux/flux.component';
import { PayedUsedComponent } from './financial/payed-used/payed-used.component';
import { DetailsDialog } from './financial/payed-used/details.dialog';
import { NewActivityDialog } from './especialidades/new-activity.dialog';
import { ActivitiesTableComponent } from './resume/activities-table/activities-table.component';
import { ShippingProcessingComponent } from './communication/shipping-processing/shipping-processing.component';
import { ShippingReportComponent } from './communication/shipping-report/shipping-report.component';
import { FeedbackProcessingComponent } from './communication/feedback-processing/feedback-processing.component';
import { FeedbackReportComponent } from './communication/feedback-report/feedback-report.component';
import { RpsProcessingComponent } from './communication/rps-processing/rps-processing.component';
import { RpsReportComponent } from './communication/rps-report/rps-report.component';

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
    MyInfoComponent,
    ClientsComponent,
    ResumeIndicationComponent,
    ToPayComponent,
    ToReceiveComponent,
    FluxComponent,
    PayedUsedComponent,
    DetailsDialog,
    NewActivityDialog,
    ActivitiesTableComponent,
    ShippingProcessingComponent,
    ShippingReportComponent,
    FeedbackProcessingComponent,
    FeedbackReportComponent,
    RpsProcessingComponent,
    RpsReportComponent
  ],
  exports: [
    CredenciadosComponent,
    DashboardAdminComponent,
    SidenavAdminComponent,
    DetailsDialog,
    NewActivityDialog
  ],
  entryComponents: [
    DetailsDialog,
    NewActivityDialog
  ],
})
export class DashboardAdminModule { }
