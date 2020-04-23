import {html} from "../../common/html.js";
import {GameState} from "../actions.js";
import {Generator} from "./Generator.js";

export function Idle(state: GameState) {
    return html`
        <h1 style="color: #fff;"></h1>
        <div
            style="
                width: 250px;
            "
        >
            ${state.Generators.map((gen, idx) => Generator(state, gen, idx))}
        </div>
    `;
}
