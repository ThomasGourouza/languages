import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { WordFormComponent } from './word-form.component';

@NgModule({
    declarations: [
        WordFormComponent
    ],
    providers: [
        DictionaryService
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        WordFormComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class WordFormModule { }
