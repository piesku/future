import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";

export function sys_earn(game: Game, delta: number) {
    game.TimeGoal = Date.now() + 1000;

    if (game.InputDelta["Mouse0"] === -1) {
        for (let i = 0; i < game.Generators.length; i++) {
            let gen = game.Generators[i];
            let config = GENERATORS[gen.Config];
            if (config.Kind === "click") {
                game.TimeEarned += income(config, gen.Count);
            }
        }
    }

    for (let i = 0; i < game.Generators.length; i++) {
        let gen = game.Generators[i];
        let config = GENERATORS[gen.Config];
        if (config.Kind === "auto") {
            game.TimeEarned += income(config, gen.Count) * delta;
        }
    }
}
