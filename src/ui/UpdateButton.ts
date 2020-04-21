import {html} from "../../common/html.js";
import {seconds_to_short_time} from "../../common/time.js";
import {Action, GameState} from "../actions.js";

export function UpdateButton({Seconds, UpdatePrice}: GameState) {
    let id_disabled = Seconds < UpdatePrice;

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
