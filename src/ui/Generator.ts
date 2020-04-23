import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Action, GeneratorState} from "../actions.js";

export function Generator(time: number, gen: GeneratorState, index: number) {
    let current_income = gen.Config.BaseIncome * gen.Count;
    let next_income = gen.Config.BaseIncome * (gen.Count + 1);
    let disabled = time < gen.Cost ? "disabled" : "";
    return html`
        <button
            style="width: 100%"
            onmouseup="event.stopPropagation(); $(${Action.PurchaseGenerator}, ${index});"
            ${disabled}
        >
            <strong>${gen.Config.Kind} ${index}</strong><br />
            Count: ${gen.Count}<br />
            Current Income: ${human_time_short(current_income)}<br />
            Upgrade: ${human_time_short(gen.Cost)}<br />
            Next Income: ${human_time_short(next_income)}
        </button>
    `;
}
