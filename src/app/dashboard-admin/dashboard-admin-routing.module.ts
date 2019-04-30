import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAdminComponent } from './dashboard-admin.component';
import { CredenciadosComponent } from './credenciados/credenciados.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { ResumeComponent } from './resume/resume.component';
import { ClientsComponent } from './clients/clients.component';
import { MessagesAdminComponent } from './messages-admin/messages-admin.component';
import { ResumeIndicationComponent } from './resume-indication/resume-indication.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { CommunicationComponent } from './communication/communication.component';
import { ToPayComponent } from './financial/to-pay/to-pay.component';
import { ToReceiveComponent } from './financial/to-receive/to-receive.component';
import { FluxComponent } from './financial/flux/flux.component';
import { PayedUsedComponent } from './financial/payed-used/payed-used.component';

const routes: Routes = [
    { path: 'dashboard-admin',
        component: DashboardAdminComponent,
        children: [
            {
                path: 'credenciados',
                component: CredenciadosComponent
            },
            {
                path: 'especialidades',
                component: EspecialidadesComponent
            },
            {
                path: 'newsletter',
                component: NewsletterComponent
            },
            {
                path: 'slide-show',
                component: SlideShowComponent
            },
            {
                path: 'resumo',
                component: ResumeComponent
            },
            {
                path: 'clientes',
                component: ClientsComponent
            },
            {
                path: 'financeiro-a-pagar',
                component: ToPayComponent
            },
            {
                path: 'financeiro-a-receber',
                component: ToReceiveComponent
            },
            {
                path: 'financeiro-fluxo-caixa',
                component: FluxComponent
            },
            {
                path: 'financeiro-pagou-utilizou',
                component: PayedUsedComponent
            },
            {
                path: 'mensagens',
                component: MessagesAdminComponent
            },
            {
                path: 'resumo-indicação',
                component: ResumeIndicationComponent
            },
            {
                path: 'minhas-informações',
                component: MyInfoComponent
            },
            {
                path: 'comunicação',
                component: CommunicationComponent
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
