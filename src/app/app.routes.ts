import { Routes } from "@angular/router";
import { DictionaryComponent } from "./components/dictionary/dictionary.component";
import { GameComponent } from "./components/game/game.component";
import { HomeComponent } from "./components/home/home.component";

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dictionary', component: DictionaryComponent },
    { path: 'game', component: GameComponent }
];
