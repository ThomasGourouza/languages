import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [
        NavigationComponent
    ],
    providers: [
        ConfirmationService
    ],
    imports: [
        CommonModule,
        TabMenuModule,
        ConfirmDialogModule
    ],
    exports: [
        NavigationComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class NavigationModule { }
