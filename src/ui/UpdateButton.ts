import {Action} from "../actions.js";
import {html} from "./html.js";

export function TimeActionButton() {
    return html`
        <button onclick="$(${Action.ToggleClearColor})">
            Update me!
        </button>
    `;
}
