import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {GeneratorState, income, mult_progress, total_cost} from "../generator.js";

export function Generator(game: Game, gen: GeneratorState, index: number) {
    let buy_count = game.InputState["Shift"] ? 10 : 1;
    let cost = total_cost(gen.Config, gen.Count, buy_count);
    let disabled = game.Rewinding || game.TimeEarned < cost ? "disabled" : "";

    let current_income = income(gen.Config, gen.Count);
    let next_income = income(gen.Config, gen.Count + buy_count);

    let progress = mult_progress(gen.Config, gen.Count);

    return html`
        <div
            style="
                display: flex;
                flex-direction: column;
                margin-bottom: 5px;
                padding: 0 2px;
                background: #222;
                color: #eee;
            "
        >
            <div style="display: flex; padding: 2px 0;">
                <h3 style="flex: 3; margin: 0;">${gen.Config.Kind.toUpperCase()}${index}</h3>
                <div style="flex: 1">${gen.Count}</div>
            </div>

            <div>
                Time per second: ${human_time_short(current_income)}<br />
                Next (Debug): ${human_time_short(next_income)}<br />
            </div>

            <button
                style="width: 100%; height: 30px;"
                onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, ${index});"
                ${disabled}
            >
                Buy ${buy_count} for ${human_time_short(cost)}
            </button>

            ${progress &&
            html`
                <div style="display: flex; padding: 2px 0;">
                    <progress
                        style="flex: 3; margin: 0;"
                        value="${progress.Value}"
                        max="${progress.Target}"
                    >
                        ${progress.Value / progress.Target}
                    </progress>
                    <div style="flex: 1">+${progress.Multiplier * 100}%</div>
                </div>
            `}
        </div>
    `;
}
