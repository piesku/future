import {html} from "../../common/html.js";
import {MAX_SECONDS} from "../../common/time.js";
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

export function Idle(game: Game) {
    return html`
        <div style="display: flex; justify-content: space-between;">
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
                ${Score()} ${Statistics(game)}
            </div>
        </div>
        ${game.FirstRun && FirstRun(game)} ${game.TimeEarnedOffline > 0 && OfflineProgress(game)}
        ${!game.HasWon && game.DateCurrent > game.DateGoal && Victory()}
        ${game.DateCurrent > MAX_SECONDS && BeyondDate()}
        ${game.TimeEarned > Number.MAX_SAFE_INTEGER && BeyondInteger()}
        ${game.TimeEarned >= Number.MAX_VALUE && BeyondFloat()}
    `;
}
