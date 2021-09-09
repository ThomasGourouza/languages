import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { GameComponent } from './components/game/game.component';
import { DictionaryService } from './service/dictionary.service';
import { ScoreService } from './service/score.service';
import { ScoreComponent } from './components/score/score.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DictionaryComponent,
    GameComponent,
    ScoreComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'deutsch'),
    AngularFirestoreModule
  ],
  providers: [
    DictionaryService,
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
