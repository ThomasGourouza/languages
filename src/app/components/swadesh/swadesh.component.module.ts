import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwadeshComponent } from './swadesh.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AddWordService } from 'src/app/service/add-word.service';
import { AccordionModule } from 'primeng/accordion';
import { ExcelService } from 'src/app/service/excel.service';
import { CommonService } from 'src/app/service/common.service';
import { SortPipe } from './pipes/sort.pipe';
import { LanguagesSelectionComponent } from './languages-selection/languages-selection.component';
import { CategoriesSelectionComponent } from './categories-selection/categories-selection.component';

@NgModule({
    declarations: [
        SwadeshComponent,
        SortPipe,
        LanguagesSelectionComponent,
        CategoriesSelectionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TableModule,
        ButtonModule,
        ToastModule,
        ListboxModule,
        CheckboxModule,
        HttpClientModule,
        MultiSelectModule,
        AccordionModule
    ],
    providers: [
        ConfirmationService,
        CommonService,
        AddWordService,
        ExcelService,
    ],
    exports: [
        SwadeshComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SwadeshModule { }
