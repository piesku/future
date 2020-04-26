import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";

export function sys_earn(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        for (let own of game.Generators) {
            let gen = GENERATORS[own.Id];
            if (gen.Kind === "click") {
                game.TimeEarned += income(gen, own.Count);
            }
        }
    }

    for (let own of game.Generators) {
        let gen = GENERATORS[own.Id];
        if (gen.Kind === "auto") {
            game.TimeEarned += income(gen, own.Count) * delta;
        }
    }

    game.TimeCurrent = game.TimeEarned * 1000 + game.TimeStart;
    game.TimeGoal = Date.now() + 1000;
}
