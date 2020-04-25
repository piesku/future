import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Generator} from "./Generator.js";
import {Statistics} from "./Statistics.js";

export function Idle(game: Game) {
    let tps = 0;
    for (let gen of game.Generators) {
        if (gen.Config.Kind === "auto") {
            tps += income(gen.Config, gen.Count);
        }
    }

    return html`
        <div style="display: flex; justify-content: space-between;">
            <div>
                ${game.Generators.map((gen, idx) => {
                    if (gen.Unlocked) {
                        return Generator(game, tps, gen, idx);
                    } else {
                        return null;
                    }
                })}
            </div>
            <div>
                <div class="window" style="margin: 32px; width: 250px">
                    <div class="title-bar">
                        <div class="title-bar-text">
                            Time Info
                        </div>
                    </div>
                    <div class="window-body">
                        <fieldset class="field-row">
                            <legend>
                                Goal
                            </legend>
                            <div class="field-row">
                                ${new Date(game.TimeGoal).toString()}
                            </div>
                        </fieldset>
                        <fieldset class="field-row">
                            <legend>
                                Current Game Time
                            </legend>
                            <div class="field-row">
                                ${new Date(game.TimeEarned * 1000 + game.TimeStart).toString()}
                            </div>
                        </fieldset>
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
                ${Statistics(game)}
            </div>
        </div>
    `;
}
