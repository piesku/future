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
            break;
        }
        case Action.Click: {
            game.Seconds += game.SecondsPerClick;
            break;
        }
    }
}
