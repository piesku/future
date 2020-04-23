import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {total_cost} from "../engine.js";
import {Game, GeneratorState} from "../game.js";

export function Generator(game: Game, gen: GeneratorState, index: number) {
    let current_income = gen.Config.BaseIncome * gen.Count;
    let next_income = gen.Config.BaseIncome * (gen.Count + 1);

    let buy_count = game.InputState["Shift"] ? 10 : 1;
    let cost = total_cost(gen, buy_count);
    let disabled = game.Rewinding || game.TimeEarned < cost ? "disabled" : "";

    return html`
        <button
            style="width: 100%"
            onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, ${index});"
            ${disabled}
        >
            <strong>${gen.Config.Kind} ${index}</strong><br />
            Count: ${gen.Count}<br />
            Current Income: ${human_time_short(current_income)}<br />
            Upgrade: ${human_time_short(cost)}<br />
            Next Income: ${human_time_short(next_income)}
        </button>
    `;
}
