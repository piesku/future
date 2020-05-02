import {play_note} from "../../common/audio.js";
import {MINUTE} from "../../common/time.js";
import {Dialog} from "../actions.js";
import {ERAS, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {ins_click} from "../sounds/snd_click.js";

export function sys_earn(game: Game, delta: number) {
    let era = ERAS[game.EraCurrent];

    if (game.InputDelta["Mouse0"] === -1) {
        play_note(game.Audio, ins_click, 74, 0);

        for (let own of game.Generators) {
            let gen = GENERATORS[own.id];
            if (gen.Kind === "click") {
                game.TimeEarned += income(era, gen, own.count);
            }
        }
    }

    for (let own of game.Generators) {
        let gen = GENERATORS[own.id];
        if (gen.Kind === "auto") {
            game.TimeEarned += income(era, gen, own.count) * delta;
        }
    }

    game.TpsCurrent = 0;
    for (let own of game.Generators) {
        let gen = GENERATORS[own.id];
        if (gen.Kind === "auto") {
            game.TpsCurrent += income(era, gen, own.count);
        }
    }

    game.DateGoal = Date.now() / 1000 + 1;
    game.DateCurrent = game.TimeEarned + game.DateStart;

    // Close the first run dialog if the user hasn't done it yet.
    if (!(game.DialogState & Dialog.FirstRun) && game.TimeEarned > MINUTE) {
        game.DialogState |= Dialog.FirstRun;
    }
}
