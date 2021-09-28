import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { GameService } from 'src/app/service/game.service';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { GameComponent } from './game.component';

@NgModule({
    declarations: [
        GameComponent
    ],
    providers: [
        DictionaryService,
        GameService
    ],
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        AccordionModule,
        ReactiveFormsModule,
        CheckboxModule,
        MultiSelectModule
    ],
    exports: [
        GameComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class GameModule { }
