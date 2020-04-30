import {html} from "../../common/html.js";

export function Score() {
    return html`
        <div class="window" style="margin: 16px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Time Elapsed
                </div>
            </div>
            <div class="window-body">
                <h3 id="time" style="margin: 0; overflow: hidden; text-overflow: ellipsis;"></h3>
            </div>
        </div>
    `;
}
