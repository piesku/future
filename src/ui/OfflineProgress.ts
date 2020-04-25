import {html} from "../../common/html.js";
import {human_time} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function OfflineProgress(game: Game) {
    let time = human_time(game.TimeOffline);
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 50px); left: calc(50% - 125px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    Offline Progress
                </div>
            </div>
            <div class="window-body">
                <p>Welcome back!</p>
                <p>
                    While you were offline, ${time.Years} years, ${time.Days} days, ${time.Hours}
                    hours, ${time.Minutes} minutes, and ${time.Seconds} seconds have gone by.
                </p>
                <div class="field-row" style="justify-content: center">
                    <button onmouseup="$(${Action.AcceptOfflineProgress});">OK</button>
                </div>
            </div>
        </div>
    `;
}
