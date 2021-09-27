import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { ScoreComponent } from './score.component';

@NgModule({
    declarations: [
        ScoreComponent
    ],
    providers: [
        GameService
    ],
    exports: [
        ScoreComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ScoreModule { }
