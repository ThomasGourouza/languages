import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ScoreService } from 'src/app/service/score.service';
import { ScoreComponent } from './score.component';

@NgModule({
    declarations: [
        ScoreComponent
    ],
    providers: [
        ScoreService
    ],
    exports: [
        ScoreComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ScoreModule { }
