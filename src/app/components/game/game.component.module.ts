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
import { MapPipe } from './pipes/map.pipe';
import { SelectTranslationPipe } from './pipes/select-translation.pipe';
import { ToastModule } from 'primeng/toast';
import { ResultModule } from './result/result.component.module';

@NgModule({
    declarations: [
        GameComponent,
        MapPipe,
        SelectTranslationPipe
    ],
    providers: [
        DictionaryService,
        GameService
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        AccordionModule,
        CheckboxModule,
        CardModule,
        ListboxModule,
        ToastModule,
        ResultModule
    ],
    exports: [
        GameComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class GameModule { }
