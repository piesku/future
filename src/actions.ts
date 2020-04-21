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

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.BuyUpdate: {
            game.Seconds -= game.UpdatePrice - game.SecondsPerClick;
            game.SecondsPerClick *= 2;
            game.UpdatePrice *= 10;
            break;
        }
        case Action.Click: {
            // XXX: Overlay is redrawn before the button click is registered.
            // @michalbe: @stamy, HALP!1!
            setTimeout(() => {
                game.Seconds += game.SecondsPerClick;
            }, 100);
            break;
        }
    }
}
