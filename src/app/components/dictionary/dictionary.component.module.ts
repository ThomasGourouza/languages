import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { AddWordService } from 'src/app/service/add-word.service';
import { AddWordModule } from './add-word/add-word.component.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ExcelService } from 'src/app/service/excel.service';

@NgModule({
    declarations: [
        DictionaryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DialogModule,
        ConfirmDialogModule,
        TableModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ToolbarModule,
        RatingModule,
        HttpClientModule,
        MultiSelectModule,
        ProgressBarModule,
        SelectButtonModule,
        AddWordModule
    ],
    providers: [
        ConfirmationService,
        DictionaryService,
        AddWordService,
        ExcelService
    ],
    exports: [
        DictionaryComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DictionaryModule { }
