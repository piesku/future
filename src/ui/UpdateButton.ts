import {seconds_to_short_time} from "../../common/time.js";
import {Action, GameState} from "../actions.js";
import {html} from "./html.js";

export function UpdateButton({Seconds, UpdatePrice}: GameState) {
    const id_disabled = Seconds < UpdatePrice;

    return html`
        <button
            onclick="$(${Action.BuyUpdate})"
            class="buy_btn"
            ${id_disabled ? 'disabled="disabled"' : ""}
        >
            Buy Update (${seconds_to_short_time(UpdatePrice)})
        </button>
    `;
}
