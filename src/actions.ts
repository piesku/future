import {GENERATORS} from "./config.js";
import {total_cost} from "./engine.js";
import {Game} from "./game.js";

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

            let buy_count = game.InputState["Shift"] ? 10 : 1;
            let cost = total_cost(gen, buy_count);

            if (!game.Rewinding && game.TimeEarned >= cost) {
                game.Rewinding = true;

                current_keyframes = 0;
                let step = cost / rewind_keyframes;
                // XXX: This should be a system, but it's 5am already :)
                let interval = setInterval(() => {
                    if (current_keyframes === rewind_keyframes) {
                        game.Rewinding = false;
                        clearInterval(interval);
                    }
                    if (game.TimeEarned > step) {
                        game.TimeEarned -= step;
                    } else {
                        game.TimeEarned = 0;
                    }
                    current_keyframes++;
                }, 1000 / 60);

                let config = GENERATORS[index];
                gen.Count += buy_count;
                gen.Cost = config.StartingCost * config.GrowthFactor ** gen.Count;
            }
            break;
        }
    }
}
