import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { AddWordService } from 'src/app/service/add-word.service';
import { AddWordModule } from './add-word/add-word.component.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { ExcelService } from 'src/app/service/excel.service';
import { CategoryLabelPipe } from './pipes/category-label.pipe';
import { CommonService } from 'src/app/service/common.service';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [
        DictionaryComponent,
        CategoryLabelPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
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
        AccordionModule,
        AddWordModule,
        FileUploadModule
    ],
    providers: [
        ConfirmationService,
        CommonService,
        AddWordService,
        ExcelService,
    ],
    exports: [
        DictionaryComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DictionaryModule { }
