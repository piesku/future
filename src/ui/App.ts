import {Game} from "../game.js";
import {Idle} from "./Idle.js";

export function App(game: Game) {
    if (game.TimeOffline > 0) {
        alert(game.TimeOffline);
        game.TimeOffline = 0;
    }
    return Idle(game);
}
