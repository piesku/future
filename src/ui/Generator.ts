import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {GeneratorState, mult_progress, total_cost} from "../generator.js";

const percent = new Intl.NumberFormat("en", {style: "percent"});

export function Generator(game: Game, gen: GeneratorState, index: number) {
    let buy_count = game.InputState["Shift"] ? 10 : 1;
    let cost = total_cost(gen.Config, gen.Count, buy_count);
    let disabled = game.Rewinding || game.TimeEarned < cost ? "disabled" : "";

    let progress = mult_progress(gen.Config, gen.Count);

    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    ${gen.Config.Kind.toUpperCase()}${index}
                </div>
            </div>
            <div class="window-body">
                <div class="field-row" style="justify-content: space-between;">
                    <h4 style="margin: 0;">${gen.Count}</h4>
                    <button
                        onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, ${index});"
                        ${disabled}
                    >
                        Buy ${buy_count} for ${human_time_short(cost)}
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
