import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {GeneratorState, mult_progress, total_cost} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});

export function Generator(game: Game, gen: GeneratorState, index: number) {
    let cost_1 = total_cost(gen.Config, gen.Count, 1);
    let cost_10 = total_cost(gen.Config, gen.Count, 10);
    let progress = mult_progress(gen.Config, gen.Count);

    return html`
        <div class="window" style="margin: 32px; width: 300px;">
            <div class="title-bar">
                <div class="title-bar-text">
                    ${gen.Config.Kind.toUpperCase()}${index}
                </div>
            </div>
            <div class="window-body">
                <div class="field-row" style="justify-content: space-between;">
                    <h4 style="margin: 0;">${gen.Count}</h4>
                    <button
                        onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, [${index}, 1]);"
                        ${game.Rewinding || game.TimeEarned < cost_1 ? "disabled" : ""}
                        style="height: 33px;"
                    >
                        Buy 1 <br />
                        ${human_time_short(cost_1)}
                    </button>
                    <button
                        onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, [${index}, 10]);"
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
                            <progress
                                style="width: 100%"
                                value="${progress.Value}"
                                max="${progress.Target}"
                            >
                                ${progress.Value / progress.Target}
                            </progress>
                        </div>
                    </fieldset>
                `}
            </div>
        </div>
    `;
}
