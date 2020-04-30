import {html} from "../../common/html.js";
import {Action} from "../actions.js";

export function Beyond() {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 50px); left: calc(50% - 125px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    🌌 Beyond Future
                </div>
            </div>
            <div class="window-body">
                <p>You have reached beyond future!</p>
                <div class="field-row" style="justify-content: center">
                    <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                        Start a New Game
                    </button>
                </div>
            </div>
        </div>
    `;
}
