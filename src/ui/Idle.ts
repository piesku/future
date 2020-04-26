import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Clock} from "./Clock.js";
import {FirstRun} from "./FirstRun.js";
import {Generator} from "./Generator.js";
import {OfflineProgress} from "./OfflineProgress.js";
import {Score} from "./Score.js";
import {Statistics} from "./Statistics.js";

export function Idle(game: Game) {
    return html`
        <div style="display: flex; justify-content: space-between;">
            <div>
                ${Clock()}
                ${game.Generators.map((gen, idx) => {
                    if (gen.Unlocked) {
                        return Generator(game, gen, idx);
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                ${Score()} ${Statistics(game)}
            </div>
        </div>
        ${game.TimeOffline > 0 && OfflineProgress(game)} ${game.FirstRun && FirstRun(game)}
    `;
}
