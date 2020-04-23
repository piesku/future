import {html} from "../../common/html.js";
import {Action, GameState, GeneratorState} from "../actions.js";

export function Idle(state: GameState) {
    return html`
        <h1></h1>
        <h2></h2>
        <div>
            ${state.Generators.map((gen, idx) => Generator(state.TimeEarned, gen, idx))}
        </div>
    `;
}

function Generator(time: number, gen: GeneratorState, index: number) {
    let current_income = gen.Config.BaseIncome * gen.Count;
    let next_income = gen.Config.BaseIncome * (gen.Count + 1);
    let disabled = time < gen.Cost ? "disabled" : "";
    return html`
        <button onclick="$(${Action.PurchaseGenerator}, ${index});" ${disabled}>
            <strong>${gen.Config.Kind} ${index}</strong><br />
            Count: ${gen.Count}<br />
            Current Income: ${current_income}<br />
            Upgrade: $${gen.Cost.toFixed(2)}<br />
            Next Income: ${next_income}
        </button>
    `;
}
