import { Routes } from "@angular/router";
import { CrudComponent } from "./components/crud/crud.component";
import { GameComponent } from "./components/game/game.component";

export const APP_ROUTES: Routes = [
    { path: 'dictionary', component: CrudComponent },
    { path: 'game', component: GameComponent }
];
