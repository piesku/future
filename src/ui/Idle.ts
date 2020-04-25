import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Clock} from "./Clock.js";
import {Generator} from "./Generator.js";
import {Score} from "./Score.js";
import {Statistics} from "./Statistics.js";

export function Idle(game: Game) {
    return html`
        <div style="display: flex; justify-content: space-between;">
            <div>
                ${game.Generators.map((gen, idx) => {
                    if (gen.Unlocked) {
                        return Generator(game, gen, idx);
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                ${Score()} ${Clock(game)} ${Statistics(game)}
            </div>
        </div>
    `;
}
