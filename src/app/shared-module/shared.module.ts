import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPaginatorIntl } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';

import { AtividadesComponent } from '../atividades/atividades.component';
import { ModalComponent } from '../modal/modal.component';
import { SliderComponent } from '../slider/slider.component';
import { UserDataFormsComponent } from '../user-data-forms/user-data-forms.component';

import { NomeAtividadePipe } from '../pipes/nome-atividade.pipe';
import { SearchBoxPipe } from '../pipes/search-box.pipe';
import { TipoPessoaPipe } from '../pipes/tipo-pessoa.pipe';
import { CurrencyFormatPipe } from '../pipes/custom-number-format';

import { MatPaginatorIntlCro } from '../custom-paginator';

@NgModule({
    imports: [
        ClickOutsideModule,
        CommonModule,
        FormsModule,
        NgxLoadingModule.forRoot({}),
        NgxPaginationModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatChipsModule,
        MatCardModule,
        MatTabsModule,
        ChartsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTreeModule,
        MatTableModule,
        MatIconModule
    ],
    exports: [
        AtividadesComponent,
        ClickOutsideModule,
        FormsModule,
        ReactiveFormsModule,
        ModalComponent,
        SliderComponent,
        NgxLoadingModule,
        NgxPaginationModule,
        NomeAtividadePipe,
        SearchBoxPipe,
        TipoPessoaPipe,
        CurrencyFormatPipe,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatChipsModule,
        MatCardModule,
        MatTabsModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTreeModule,
        ChartsModule,
        MatIconModule,
        UserDataFormsComponent
    ],
    declarations: [
        AtividadesComponent,
        ModalComponent,
        SliderComponent,
        NomeAtividadePipe,
        SearchBoxPipe,
        TipoPessoaPipe,
        CurrencyFormatPipe,
        UserDataFormsComponent
    ],
    providers: [
      { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
    ],
})
export class SharedModule { }
