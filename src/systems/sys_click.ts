import {Action, dispatch} from "../actions.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";

export function sys_click(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        dispatch(game, Action.Click, null);

        for (let i = 0; i < game.Generators.length; i++) {
            if (game.Generators[i].Config.Kind === "click") {
                game.TimeEarned += GENERATORS[i].BaseIncome * game.Generators[i].Count;
            }
        }
    }

    for (let i = 0; i < game.Generators.length; i++) {
        if (game.Generators[i].Config.Kind === "auto") {
            game.TimeEarned += GENERATORS[i].BaseIncome * game.Generators[i].Count;
        }
    }
}
