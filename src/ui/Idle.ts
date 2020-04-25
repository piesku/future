import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Clock} from "./Clock.js";
import {Generator} from "./Generator.js";
import {Statistics} from "./Statistics.js";

export function Idle(game: Game) {
    let total_income = 0;
    for (let gen of game.Generators) {
        if (gen.Config.Kind === "auto") {
            total_income += income(gen.Config, gen.Count);
        }
    }

    return html`
        <div style="display: flex; justify-content: space-between;">
            <div>
                ${game.Generators.map((gen, idx) => {
                    if (gen.Unlocked) {
                        return Generator(game, total_income, gen, idx);
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                ${Clock(game, total_income)} ${Statistics(game, total_income)}
            </div>
        </div>
    `;
}
