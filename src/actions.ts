import {play_note} from "../common/audio.js";
import {ERAS, GENERATORS} from "./config.js";
import {Game, game_save} from "./game.js";
import {total_cost} from "./generator.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {ins_click} from "./sounds/snd_click.js";
import {init_generators} from "./state.js";

export const enum Action {
    PurchaseGenerator,
    AcceptOfflineProgress,
    AdvanceEra,
    StartNewGame,
    DismissDialog,
    DraggingStart,
    DraggingStop,
    BringToTop,
}

export const enum Dialog {
    FirstRun = 1 << 0,
    Victory = 1 << 1,
    BeyondDate = 1 << 2,
    BeyondInteger = 1 << 3,
    BeyondFloat = 1 << 4,
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
        case Action.AcceptOfflineProgress: {
            game.TimeEarnedOffline = 0;
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
                game.DialogState = 0;
                game.EraCurrent = 0;
                game.Rewinding = false;
                game.TpsCurrent = 0;
                game.TimeEarned = 0;
                game.TimeEarnedOffline = 0;
                game.Generators = init_generators();

                game_save(game);
                scene_stage(game);
            });
            break;
        }
        case Action.DismissDialog: {
            let dialog = payload as number;
            game.DialogState |= dialog;
            game_save(game);
            break;
        }
        case Action.DraggingStart: {
            let name = payload as string;
            game.Dragging = name;
            if (!game.WindowPositions[name]) {
                game.WindowPositions[name] = [0, 0, 0];
            } else {
                // Increase the z-index.
                let max = 0;
                for (let window in game.WindowPositions) {
                    if (game.WindowPositions[window][2] > max) {
                        max = game.WindowPositions[window][2];
                    }
                }
                game.WindowPositions[name][2] = max + 1;
            }
            break;
        }
        case Action.DraggingStop: {
            game.Dragging = undefined;
            break;
        }
        case Action.BringToTop: {
            let name = payload as string;
            if (!game.WindowPositions[name]) {
                game.WindowPositions[name] = [0, 0, 0];
            } else {
                // Increase the z-index.
                let max = 0;
                for (let window in game.WindowPositions) {
                    if (game.WindowPositions[window][2] > max) {
                        max = game.WindowPositions[window][2];
                    }
                }
                game.WindowPositions[name][2] = max + 1;
            }
            break;
        }
    }
}
