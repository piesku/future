import {GENERATORS} from "./config.js";
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

            let buy_count;
            if (game.InputState["Shift"]) {
                buy_count = 10;
            } else {
                buy_count = 1;
            }

            let total_cost =
                gen.Config.StartingCost *
                gen.Config.GrowthFactor ** gen.Count *
                bulk(gen.Config.GrowthFactor, buy_count);

            if (!game.Rewinding && game.TimeEarned >= total_cost) {
                game.Rewinding = true;

                current_keyframes = 0;
                let step = total_cost / rewind_keyframes;
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

export function bulk(growth: number, count: number) {
    let factor = 0;
    for (let i = 0; i < count; i++) {
        factor += growth ** i;
    }
    return factor;
}
