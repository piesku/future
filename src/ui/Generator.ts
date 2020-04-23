import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {GeneratorState, income, total_cost} from "../generator.js";

export function Generator(game: Game, gen: GeneratorState, index: number) {
    let buy_count = game.InputState["Shift"] ? 10 : 1;
    let cost = total_cost(gen, buy_count);
    let disabled = game.Rewinding || game.TimeEarned < cost ? "disabled" : "";

    let current_income = income(gen, 0);
    let next_income = income(gen, buy_count);

    return html`
        <button
            style="width: 100%"
            onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, ${index});"
            ${disabled}
        >
            <strong>${gen.Config.Kind} ${index}</strong><br />
            Count: ${gen.Count}<br />
            Current Income: ${human_time_short(current_income)}<br />
            Next Income: ${human_time_short(next_income)}<br />
            Purchase: ${human_time_short(cost)}
        </button>
    `;
}
