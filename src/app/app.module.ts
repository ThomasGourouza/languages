import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { DictionaryModule } from './components/dictionary/dictionary.component.module';
import { GameModule } from './components/game/game.component.module';
import { NavigationModule } from './components/navigation/navigation.component.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'deutsch'),
    AngularFirestoreModule,
    NavigationModule,
    DictionaryModule,
    GameModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent }

    ])
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
