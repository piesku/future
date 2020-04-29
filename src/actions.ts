import {play_note} from "../common/audio.js";
import {ERAS, GENERATORS} from "./config.js";
import {Game, game_save} from "./game.js";
import {total_cost} from "./generator.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {ins_click} from "./sounds/snd_click.js";
import {init_generators} from "./state.js";

export const enum Action {
    PurchaseGenerator,
    AcceptFirstRun,
    AcceptOfflineProgress,
    AcceptVictory,
    AdvanceEra,
    StartNewGame,
}

let rewind_keyframes = 10;
let current_keyframes = 0;

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.PurchaseGenerator: {
            let [id, buy_count] = payload as [number, number];
            let gen = GENERATORS[id];
            let own = game.Generators[id];
            let cost = total_cost(gen, own.count, buy_count);

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

                own.count += buy_count;

                // Unlock the next generator for purchase
                let next = game.Generators[id + 1];
                if (next && !next.unlocked) {
                    next.unlocked = true;
                }

                play_note(game.Audio, ins_click, 84, 0);
                game_save(game);
            }
            break;
        }
        case Action.AcceptFirstRun: {
            game.FirstRun = false;
            game_save(game);
            break;
        }
        case Action.AcceptOfflineProgress: {
            game.TimeEarnedOffline = 0;
            break;
        }
        case Action.AcceptVictory: {
            game.HasWon = true;
            break;
        }
        case Action.AdvanceEra: {
            let next_era = ERAS[game.EraCurrent + 1];
            if (game.TpsCurrent > next_era.TpsRequired) {
                requestAnimationFrame(() => {
                    game.EraCurrent++;
                    game.Rewinding = false;
                    game.TpsCurrent = 0;
                    game.TimeEarned = 0;
                    game.TimeEarnedOffline = 0;
                    game.Generators = init_generators();

                    game_save(game);
                    scene_stage(game);
                });
            }
            break;
        }
        case Action.StartNewGame: {
            requestAnimationFrame(() => {
                game.FirstRun = true;
                game.HasWon = false;
                game.EraCurrent = 0;

                game.Rewinding = false;
                game.TpsCurrent = 0;
                game.TimeEarned = 0;
                game.TimeEarnedOffline = 0;
                game.Generators = [
                    {
                        id: 0,
                        count: 1,
                        unlocked: true,
                    },
                    {
                        id: 1,
                        count: 0,
                        unlocked: true,
                    },
                    {
                        id: 2,
                        count: 0,
                        unlocked: false,
                    },
                    {
                        id: 3,
                        count: 0,
                        unlocked: false,
                    },
                    {
                        id: 4,
                        count: 0,
                        unlocked: false,
                    },
                    {
                        id: 5,
                        count: 0,
                        unlocked: false,
                    },
                ];

                game_save(game);
                scene_stage(game);
            });
            break;
        }
    }
}
