import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';

import { AtividadesComponent } from '../atividades/atividades.component';
import { ModalComponent } from '../modal/modal.component';
import { SliderComponent } from '../slider/slider.component';

import { NomeAtividadePipe } from '../pipes/nome-atividade.pipe';
import { SearchBoxPipe } from '../pipes/search-box.pipe';
import { TipoPessoaPipe } from '../pipes/tipo-pessoa.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxLoadingModule.forRoot({}),
        NgxPaginationModule,
        ReactiveFormsModule
    ],
    exports: [
        AtividadesComponent,
        FormsModule,
        ReactiveFormsModule,
        ModalComponent,
        SliderComponent,
        NgxLoadingModule,
        NgxPaginationModule,
        NomeAtividadePipe,
        SearchBoxPipe,
        TipoPessoaPipe
    ],
    declarations: [
        AtividadesComponent,
        ModalComponent,
        SliderComponent,
        NomeAtividadePipe,
        SearchBoxPipe,
        TipoPessoaPipe
    ],
    providers: [],
})
export class SharedModule { }
