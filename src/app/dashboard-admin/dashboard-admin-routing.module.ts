import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAdminComponent } from './dashboard-admin.component';
import { CredenciadosComponent } from './credenciados/credenciados.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SlideShowComponent } from './slide-show/slide-show.component';

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
