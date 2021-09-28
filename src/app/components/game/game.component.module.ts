import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryService } from 'src/app/service/dictionary.service';
import { GameService } from 'src/app/service/game.service';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
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
        CardModule,
        ListboxModule
    ],
    exports: [
        GameComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class GameModule { }
