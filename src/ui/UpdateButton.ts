import {Action} from "../actions.js";
import {html} from "./html.js";

export function UpdateButton(time: number) {
    return html`
        <button onclick="$(${Action.BuyUpdate})" class="buy_btn">
            Buy Update
        </button>
    `;
}
