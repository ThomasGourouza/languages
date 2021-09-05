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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DictionaryComponent,
    GameComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    DictionaryService,
    ScoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
