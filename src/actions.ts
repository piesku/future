import {Game} from "./game.js";

export interface GameState {
    Seconds: number;
}

export const enum Action {
    BuyUpdate,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.BuyUpdate: {
            break;
        }
    }
}
