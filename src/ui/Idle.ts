import {html} from "../../common/html.js";
import {Action, GameState} from "../actions.js";

export function Idle(state: GameState) {
    return html`
        <h1></h1>
        <div>
            <button onclick="$(${Action.PurchaseClickGenerator}, 0)">Upgrade click</button>
        </div>
        <div>
            <button onclick="$(${Action.PurchaseAutoGenerator}, 0)">
                Minute ${state.AutoGenerators[0].Count} ($${state.AutoGenerators[0].Cost})
            </button>
            <button onclick="$(${Action.PurchaseAutoGenerator}, 1)">
                Minute ${state.AutoGenerators[1].Count} ($${state.AutoGenerators[1].Cost})
            </button>
            <button onclick="$(${Action.PurchaseAutoGenerator}, 2)">
                Minute ${state.AutoGenerators[2].Count} ($${state.AutoGenerators[2].Cost})
            </button>
            <button onclick="$(${Action.PurchaseAutoGenerator}, 3)">
                Minute ${state.AutoGenerators[3].Count} ($${state.AutoGenerators[3].Cost})
            </button>
            <button onclick="$(${Action.PurchaseAutoGenerator}, 4)">
                Minute ${state.AutoGenerators[4].Count} ($${state.AutoGenerators[4].Cost})
            </button>
        </div>
    `;
}
