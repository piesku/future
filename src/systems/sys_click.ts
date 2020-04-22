import {Action, dispatch} from "../actions.js";
import {AUTO_GENERATORS, CLICK_GENERATORS} from "../config.js";
import {Game} from "../game.js";

export function sys_click(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === -1) {
        dispatch(game, Action.Click, null);

        for (let i = 0; i < game.ClickGenerators.length; i++) {
            game.TimeEarned += CLICK_GENERATORS[i].BaseIncome * game.ClickGenerators[i].Count;
        }
    }

    for (let i = 0; i < game.AutoGenerators.length; i++) {
        game.TimeEarned += AUTO_GENERATORS[i].BaseIncome * game.AutoGenerators[i].Count;
    }
}
