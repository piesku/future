import {html} from "../../common/html.js";
import {MAX_SECONDS} from "../../common/time.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {BeyondDate} from "./BeyondDate.js";
import {BeyondFloat} from "./BeyondFloat.js";
import {BeyondInteger} from "./BeyondInteger.js";
import {Clock} from "./Clock.js";
import {EraProgress} from "./EraProgress.js";
import {FirstRun} from "./FirstRun.js";
import {Generator} from "./Generator.js";
import {OfflineProgress} from "./OfflineProgress.js";
import {Score} from "./Score.js";
import {Statistics} from "./Statistics.js";
import {Victory} from "./Victory.js";

export function App(game: Game) {
    let is_victory = game.DateCurrent > game.DateGoal;
    let is_beyond_date = game.DateCurrent > MAX_SECONDS;
    let is_beyond_integer = game.TimeEarned > Number.MAX_SAFE_INTEGER;
    let is_beyond_float = game.TimeEarned >= Number.MAX_VALUE;

    return html`
        <div
            style="height: 100vh; display: flex; justify-content: space-between;"
            onmouseup="$(${Action.DraggingStop});"
        >
            <div>
                ${Clock(game)}
                ${game.Generators.map((gen, idx) => {
                    if (gen.unlocked) {
                        return Generator(game, gen, idx);
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                ${EraProgress(game)}
            </div>
            <div>
                ${Score(game)} ${Statistics(game)}
            </div>
        </div>

        ${!(game.DialogState & Dialog.FirstRun) && FirstRun(game)}
        ${game.TimeEarnedOffline > 0 && OfflineProgress(game)}
        ${is_victory && !(game.DialogState & Dialog.Victory) && Victory()}
        ${is_beyond_date && !(game.DialogState & Dialog.BeyondDate) && BeyondDate()}
        ${is_beyond_integer && !(game.DialogState & Dialog.BeyondInteger) && BeyondInteger()}
        ${is_beyond_float && !(game.DialogState & Dialog.BeyondFloat) && BeyondFloat()}
    `;
}
