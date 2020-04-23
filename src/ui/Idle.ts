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
    let disabled = time < gen.Cost ? "disabled" : "";
    return html`
        <button onclick="$(${Action.PurchaseGenerator}, ${index})" ${disabled}>
            ${gen.Config.Kind} ${index} — Count: ${gen.Count}<br />
            Upgrade: $${gen.Cost.toFixed(2)}
        </button>
    `;
}
