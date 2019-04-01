import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared-module/shared.module';

import { BuscadosComponent } from './buscados/buscados.component';
import { MapComponent } from './map/map.component';
import { MessageComponent } from '../modal-messages/message/message.component';
import { SectionComponent } from './section.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        BuscadosComponent,
        MapComponent,
        MessageComponent,
        RouterModule,
        SectionComponent
    ],
    declarations: [
        BuscadosComponent,
        MapComponent,
        MessageComponent,
        SectionComponent
    ],
    providers: [],
})
export class SectionModule { }
