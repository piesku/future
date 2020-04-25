import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Generator} from "./Generator.js";

export function Idle(game: Game) {
    let tps = 0;
    for (let gen of game.Generators) {
        if (gen.Config.Kind === "auto") {
            tps += income(gen.Config, gen.Count);
        }
    }

    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Current Statistics
                </div>
            </div>
            <div class="window-body">
                <fieldset class="field-row">
                    <legend>
                        Time Earned
                    </legend>
                    <div class="field-row">
                        <span id="time" />
                    </div>
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Time per Second
                    </legend>
                    <div class="field-row">
                        ${human_time_short(tps)}
                    </div>
                </fieldset>
            </div>
        </div>
        ${game.Generators.map((gen, idx) => Generator(game, tps, gen, idx))}
    `;
}
