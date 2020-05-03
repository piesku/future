import {html} from "../../common/html.js";
import {human_time} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function OfflineProgress(game: Game) {
    let time = human_time(game.TimeEarnedOffline);
    return PopUp(
        game,
        "💡 Offline Progress",
        html`
            <p>Welcome back!</p>
            <p>
                While you were offline, ${time.Years} years, ${time.Days} days, ${time.Hours} hours,
                ${time.Minutes} minutes, and ${time.Seconds} seconds have gone by.
            </p>
            <div class="field-row" style="justify-content: center">
                <button onmouseup="event.stopPropagation(); $(${Action.AcceptOfflineProgress});">
                    OK
                </button>
            </div>
        `,
        `$(${Action.AcceptOfflineProgress})`
    );
}
