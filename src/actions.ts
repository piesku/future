import {GeneratorConfig, GENERATORS} from "./config.js";
import {Game} from "./game.js";

export interface GeneratorState {
    Config: GeneratorConfig;
    Count: number;
    Cost: number;
}

export interface GameState {
    TimeEarned: number;
    Generators: Array<GeneratorState>;
}

export const enum Action {
    PurchaseGenerator,
}

let rewind_keyframes = 10;
let current_keyframes = 0;

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.PurchaseGenerator: {
            let index = payload as number;
            let gen = game.Generators[index];
            if (game.TimeEarned >= gen.Cost) {
                current_keyframes = 0;
                let step = gen.Cost / rewind_keyframes;
                // XXX: This should be a system, but it's 5am already :)
                let interval = setInterval(() => {
                    if (current_keyframes === rewind_keyframes) {
                        clearInterval(interval);
                    }
                    game.TimeEarned -= step;
                    current_keyframes++;
                }, 1000 / 60);

                let config = GENERATORS[index];
                gen.Count++;
                gen.Cost = config.StartingCost * config.GrowthFactor ** gen.Count;
            }
            break;
        }
    }
}
