import {html} from "../../common/html.js";
import {years_from} from "../../common/time.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function FirstRun(game: Game) {
    return PopUp(
        game,
        "⏰ Time Is Money™ 1.0",
        html`
            <p>Welcome to <em>Time Is Money</em>™!</p>
            <p>
                Your goal is to lead your people into the literal actual future. Like, literally one
                second from <em>right now</em>.
            </p>
            <p>
                Use the time measurement devices on the left to control and speed up the passage of
                time. Careful though, as each purchase will rewind the world's clock by the duration
                equal to its cost.
            </p>
            <p>To ${years_from(game.DateGoal)}, and beyond!</p>
            <div class="field-row" style="justify-content: center">
                <button
                    onmouseup="event.stopPropagation(); $(${Action.DismissDialog}, ${Dialog.FirstRun});"
                >
                    OK
                </button>
            </div>
        `,
        `$(${Action.DismissDialog}, ${Dialog.FirstRun})`
    );
}
