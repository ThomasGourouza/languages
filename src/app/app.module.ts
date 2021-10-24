import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { DictionaryModule } from './components/dictionary/dictionary.component.module';
import { GameModule } from './components/game/game.component.module';
import { NavigationModule } from './components/navigation/navigation.component.module';
import { MessageService } from 'primeng/api';
import { HomeModule } from './components/home/home.component.module';
import { SettingsModule } from './components/settings/settings.component.module';
import { SettingsService } from './service/settings.service';
import { DictionaryService } from './service/dictionary.service';
const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAckgn0KwGstkB-duM03Gsv8pyFMBXnuSU",
    authDomain: "dictionary-f8aa9.firebaseapp.com",
    databaseURL: "https://dictionary-f8aa9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dictionary-f8aa9",
    storageBucket: "dictionary-f8aa9.appspot.com",
    messagingSenderId: "577696819589",
    appId: "1:577696819589:web:3b9e809f82759376f0bcec"
  }
};

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
    HomeModule,
    SettingsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent }

    ])
  ],
  providers: [
    MessageService,
    DictionaryService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
