import {Game} from "../game.js";
import {income} from "../generator.js";

export function sys_earn(game: Game, delta: number) {
    game.TimeGoal = Date.now();

    if (game.InputDelta["Mouse0"] === -1) {
        for (let i = 0; i < game.Generators.length; i++) {
            let gen = game.Generators[i];
            if (gen.Config.Kind === "click") {
                game.TimeEarned += income(gen.Config, gen.Count);
            }
        }
    }

    for (let i = 0; i < game.Generators.length; i++) {
        let gen = game.Generators[i];
        if (gen.Config.Kind === "auto") {
            game.TimeEarned += income(gen.Config, gen.Count) * delta;
        }
    }
}
