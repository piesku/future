import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {mult_progress, total_cost} from "../generator.js";
import {GeneratorState} from "../state.js";
import {Window} from "./Window.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});

export function Generator(game: Game, own: GeneratorState, index: number) {
    let gen = GENERATORS[own.id];
    let cost_1 = total_cost(gen, own.count, 1);
    let cost_10 = total_cost(gen, own.count, 10);
    let progress = mult_progress(gen, own.count);

    return Window(
        game,
        gen.Name,
        html`
            <div class="field-row" style="justify-content: space-between;">
                <h4 style="margin: 0;">${own.count}</h4>
                <button
                    onmouseup="$(${Action.PurchaseGenerator}, [${index}, 1]);"
                    ${game.Rewinding || game.TimeEarned < cost_1 ? "disabled" : ""}
                    style="height: 33px;"
                >
                    Buy 1 <br />
                    ${human_time_short(cost_1)}
                </button>
                <button
                    onmouseup="$(${Action.PurchaseGenerator}, [${index}, 10]);"
                    ${game.Rewinding || game.TimeEarned < cost_10 ? "disabled" : ""}
                    style="height: 35px;"
                >
                    Buy 10 <br />
                    ${human_time_short(cost_10)}
                </button>
            </div>

            ${progress &&
            html`
                <fieldset class="field-row">
                    <legend>
                        Next Bonus: +${percent.format(progress.Multiplier - 1)}
                    </legend>

                    <div class="field-row">
                        <progress value="${progress.Value}" max="${progress.Target}">
                            ${progress.Value / progress.Target}
                        </progress>
                    </div>
                </fieldset>
            `}
        `
    );
}
