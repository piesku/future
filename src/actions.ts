import {Game} from "./game.js";

export interface GameState {
    Seconds: number;
}

export const enum Action {
    ToggleClearColor,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.ToggleClearColor: {
            break;
        }
    }
}
