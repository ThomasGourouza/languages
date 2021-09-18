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
import { NavigationModule } from './components/navigation/Navigation.component.module';
import { CrudModule } from './components/crud/crud.component.module';
import { DictionaryModule } from './components/dictionary/dictionary.component.module';
import { GameModule } from './components/game/game.component.module';
import { ScoreModule } from './components/score/score.component.module';

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
    CrudModule,
    DictionaryModule,
    GameModule,
    ScoreModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent }

    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
