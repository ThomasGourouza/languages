import { Routes } from "@angular/router";
import { DictionaryComponent } from "./components/dictionary/dictionary.component";
import { GameComponent } from "./components/game/game.component";

export const APP_ROUTES: Routes = [
    { path: 'dictionary', component: DictionaryComponent },
    { path: 'game', component: GameComponent }
];
