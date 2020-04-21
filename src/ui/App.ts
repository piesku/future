import {html} from "../../common/html.js";
import {GameState} from "../actions.js";
import {Timer} from "./Timer.js";
import {UpdateButton} from "./UpdateButton.js";

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
            ${UpdateButton(state)}
        </div>
        ${Timer(state)}
    `;
}
