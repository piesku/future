import {play_note} from "../../common/audio.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {ins_click} from "../sounds/snd_click.js";

export function sys_earn(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        play_note(game.Audio, ins_click, 74, 0);

        for (let own of game.Generators) {
            let gen = GENERATORS[own.id];
            if (gen.Kind === "click") {
                game.TimeEarned += income(gen, own.count);
            }
        }
    }

    for (let own of game.Generators) {
        let gen = GENERATORS[own.id];
        if (gen.Kind === "auto") {
            game.TimeEarned += income(gen, own.count) * delta;
        }
    }

    game.TimeCurrent = game.TimeEarned * 1000 + game.TimeStart;
    game.TimeGoal = Date.now() + 1000;
}
