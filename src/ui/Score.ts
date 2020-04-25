import {html} from "../../common/html.js";

export function Score() {
    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Time Earned
                </div>
            </div>
            <div class="window-body">
                <h3 id="time" style="margin: 0;"></h3>
            </div>
        </div>
    `;
}