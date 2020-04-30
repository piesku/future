import {html} from "../../common/html.js";
import {year_f} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function FirstRun(game: Game) {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 75px); left: calc(50% - 125px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    ⏰ Time Is Money™ 1.0
                </div>
            </div>
            <div class="window-body">
                <p>Welcome to <em>Time Is Money</em>™!</p>
                <p>
                    Your goal is to lead your people into the literal actual future. Like, literally
                    one second from <em>right now</em>.
                </p>
                <p>
                    Use the time measurement devices on the left to control and speed up the passage
                    of time. Careful though, as each purchase will rewind the world's clock by the
                    duration equal to its cost.
                </p>
                <p>To ${year_f.format(game.DateGoal)}, and beyond!</p>
                <div class="field-row" style="justify-content: center">
                    <button onmouseup="event.stopPropagation(); $(${Action.AcceptFirstRun});">
                        OK
                    </button>
                </div>
            </div>
        </div>
    `;
}
