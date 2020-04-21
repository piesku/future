import {html} from "./html.js";

export function Timer(time: number) {
    return html`
        <span class="timer">
            ${time}
        </span>
    `;
}
