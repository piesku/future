import {GameState} from "../actions.js";
import {html} from "./html.js";
import {TimeActionButton} from "./TimeActionButton.js";

export function App(state: GameState) {
    return html`
        <div
            style="
                position: absolute;
                top: 0;
                background-color: #000;
                color: #fff;
            "
        >
            ${TimeActionButton()}
        </div>
    `;
}
