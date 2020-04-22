import {set_seed} from "../common/random.js";
import {AUTO_GENERATORS, CLICK_GENERATORS} from "./config.js";
import {Game} from "./game.js";

export interface GeneratorState {
    Count: number;
    Cost: number;
}

export interface GameState {
    CurrentScene?: Function;

    Seconds: number;
    UpdatePrice: number;
    SecondsPerClick: number;

    // Model experiment
    TimeEarned: number;
    ClickGenerators: Array<GeneratorState>;
    AutoGenerators: Array<GeneratorState>;
}

export const enum Action {
    PurchaseClickGenerator,
    PurchaseAutoGenerator,
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
            game.Seconds += game.SecondsPerClick;
            set_seed(game.Seconds);
            break;
        }

        case Action.PurchaseClickGenerator: {
            let index = payload as number;
            let gen = game.ClickGenerators[index];
            let config = CLICK_GENERATORS[index];
            gen.Count++;
            gen.Cost = config.StartingCost * config.GrowthFactor ** gen.Count;
            break;
        }

        case Action.PurchaseAutoGenerator: {
            let index = payload as number;
            let gen = game.AutoGenerators[index];
            let config = AUTO_GENERATORS[index];
            gen.Count++;
            gen.Cost = config.StartingCost * config.GrowthFactor ** gen.Count;
            break;
        }
    }
}
