import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CotationsComponent } from './cotations/cotations.component';
import { DashboardComponent } from './dashboard.component';
import { FriendIndicationComponent } from './friend-indication/friend-indication.component';
import { MessagesComponent } from './messages/messages.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UnityInformationComponent } from './unity-information/unity-information.component';
import { UnityRegisterComponent } from './unity-information/unity-register.component';
import { UserDataFormsComponent } from '../user-data-forms/user-data-forms.component';
import { UserInformationComponent } from './user-information/user-information.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        CotationsComponent,
        DashboardComponent,
        FriendIndicationComponent,
        MessagesComponent,
        MyAdsComponent,
        SidenavComponent,
        UnityInformationComponent,
        UnityRegisterComponent,
        UserDataFormsComponent,
        UserInformationComponent
    ],
    declarations: [
        CotationsComponent,
        DashboardComponent,
        FriendIndicationComponent,
        MessagesComponent,
        MyAdsComponent,
        SidenavComponent,
        UnityInformationComponent,
        UnityRegisterComponent,
        UserDataFormsComponent,
        UserInformationComponent
    ],
    providers: [],
})
export class DashboardModule { }
