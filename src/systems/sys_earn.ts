import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";

export function sys_earn(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
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
