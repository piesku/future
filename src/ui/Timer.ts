import {seconds_to_time} from "../../common/time.js";
import {GameState} from "../actions.js";
import {html} from "./html.js";

export function Timer({Seconds}: GameState) {
    return html`
        <span class="timer">
            ${seconds_to_time(Seconds)}
        </span>
    `;
}
