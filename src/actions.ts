import {Game} from "./game.js";
import {total_cost} from "./generator.js";

export const enum Action {
    PurchaseGenerator,
}

let rewind_keyframes = 10;
let current_keyframes = 0;

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.PurchaseGenerator: {
            let [index, buy_count] = payload as [number, number];
            let gen = game.Generators[index];
            let cost = total_cost(gen.Config, gen.Count, buy_count);

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

                gen.Count += buy_count;

                // Unlock the next generator for purchase
                let next = game.Generators[index + 1];
                if (next && !next.Unlocked) {
                    next.Unlocked = true;
                }
            }
            break;
        }
    }
}
