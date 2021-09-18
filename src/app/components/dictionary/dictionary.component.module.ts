import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { WordFormModule } from '../word-form/word-form.component.module';

@NgModule({
    declarations: [
        DictionaryComponent,
        FilterPipe
    ],
    providers: [
        DictionaryService
    ],
    imports: [
        CommonModule,
        WordFormModule
    ],
    exports: [
        DictionaryComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DictionaryModule { }
