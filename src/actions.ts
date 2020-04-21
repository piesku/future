import {set_seed} from "../common/random.js";
import {Game} from "./game.js";

export interface GameState {
    Seconds: number;
    UpdatePrice: number;
    SecondsPerClick: number;
}

export const enum Action {
    BuyUpdate,
    Click,
}

let rewind_keyframes = 10;
let current_keyframes = 0;
export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.BuyUpdate: {
            current_keyframes = 0;

            let step = game.UpdatePrice / rewind_keyframes;
            // XXX: This should be a system, but it's 5am already :)
            let interval = setInterval(() => {
                if (current_keyframes === rewind_keyframes) {
                    clearInterval(interval);
                }
                game.Seconds -= step;
                current_keyframes++;
            }, 1000 / 60);
            game.SecondsPerClick *= 2;
            game.UpdatePrice *= 10;
            break;
        }
        case Action.Click: {
            console.log("CLICK!");
            // XXX: Overlay is redrawn before the button click is registered.
            // @michalbe: @stamy, HALP!1!
            setTimeout(() => {
                game.Seconds += game.SecondsPerClick;
                set_seed(game.Seconds);
            }, 100);
            break;
        }
    }
}
