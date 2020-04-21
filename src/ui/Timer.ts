import {html} from "../../common/html.js";
import {seconds_to_time} from "../../common/time.js";
import {GameState} from "../actions.js";

export function Timer({Seconds}: GameState) {
    return html`
        <span class="timer">
            ${seconds_to_time(Seconds)}
        </span>
    `;
}
