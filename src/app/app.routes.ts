import { Routes } from "@angular/router";
import { DictionaryComponent } from "./components/dictionary/dictionary.component";
import { GameComponent } from "./components/game/game.component";
import { HomeComponent } from "./components/home/home.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { SwadeshComponent } from "./components/swadesh/swadesh.component";

export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dictionary', component: DictionaryComponent },
    { path: 'game', component: GameComponent },
    { path: 'swadesh', component: SwadeshComponent },
    { path: 'settings', component: SettingsComponent },
];
