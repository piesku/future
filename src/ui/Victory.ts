import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Victory() {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 50px); left: calc(50% - 125px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    ✨ Victory
                </div>
            </div>
            <div class="window-body">
                <p>You won!</p>
                <p>
                    Congratulations, you have reached the future!
                </p>
                <div class="field-row" style="justify-content: center">
                    <button onmouseup="$(${Action.AcceptVictory});">OK</button>
                </div>
            </div>
        </div>
    `;
}
