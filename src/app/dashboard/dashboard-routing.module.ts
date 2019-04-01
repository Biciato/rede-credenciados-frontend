import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotationsComponent } from './cotations/cotations.component';
import { DashboardComponent } from './dashboard.component';
import { FriendIndicationComponent } from './friend-indication/friend-indication.component';
import { MessagesComponent } from './messages/messages.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { UnityInformationComponent } from './unity-information/unity-information.component';
import { UserInformationComponent } from './user-information/user-information.component';

const routes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'minhas-informacoes',
        component: UserInformationComponent
      },
      {
        path: 'minhas-unidades',
        component: UnityInformationComponent
      },
      {
        path: 'indicar-amigo',
        component: FriendIndicationComponent
      },
      {
        path: 'minhas-propagandas',
        component: MyAdsComponent
      },
      {
        path: 'mensagens',
        component: MessagesComponent
      },
      {
        path: 'cotacoes',
        component: CotationsComponent
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
