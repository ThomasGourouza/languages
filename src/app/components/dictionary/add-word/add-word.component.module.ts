import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AddWordService } from 'src/app/service/add-word.service';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { AddWordComponent } from './add-word.component';

@NgModule({
    declarations: [
        AddWordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
    ],
    providers: [
        AddWordService,
        DictionaryService
    ],
    exports: [
        AddWordComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AddWordModule { }
