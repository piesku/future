import {GENERATORS} from "../config.js";
import {Game} from "../game.js";

export function sys_earn(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        for (let i = 0; i < game.Generators.length; i++) {
            if (game.Generators[i].Config.Kind === "click") {
                game.TimeEarned += GENERATORS[i].BaseIncome * game.Generators[i].Count;
            }
        }
    }

    for (let i = 0; i < game.Generators.length; i++) {
        if (game.Generators[i].Config.Kind === "auto") {
            game.TimeEarned += GENERATORS[i].BaseIncome * game.Generators[i].Count * delta;
        }
    }
}
