import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
