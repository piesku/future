import {html} from "../../common/html.js";
import {GameState} from "../actions.js";

export function Idle(state: GameState) {
    return html`
        <div>
            ${state.TimeEarned}
        </div>
    `;
}
