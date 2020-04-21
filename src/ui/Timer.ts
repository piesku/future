import {GameState} from "../actions.js";
import {html} from "./html.js";

export function Timer({Seconds}: GameState) {
    const hours = Math.floor(Seconds / 60 / 60);
    const minutes = Math.floor(Seconds / 60) - hours * 60;
    const seconds = Seconds % 60;
    return html`
        <span class="timer">
            ${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
        </span>
    `;
}
