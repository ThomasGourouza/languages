import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryService } from 'src/app/service/dictionary.service';

@NgModule({
    declarations: [
        DictionaryComponent
    ],
    providers: [
        DictionaryService
    ],
    exports: [
        DictionaryComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DictionaryModule { }
