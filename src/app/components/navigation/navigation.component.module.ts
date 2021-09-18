import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
    declarations: [
        NavigationComponent
    ],
    imports: [
        CommonModule,
        TabMenuModule
    ],
    exports: [
        NavigationComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class NavigationModule { }
