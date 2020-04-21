import {Action, dispatch} from "../actions.js";
import {Game} from "../game.js";

export function sys_click(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        dispatch(game, Action.Click, null);
    }
}
