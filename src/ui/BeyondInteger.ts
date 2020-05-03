import {html} from "../../common/html.js";
import {integer_f} from "../../common/number.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function BeyondInteger(game: Game) {
    return PopUp(
        game,
        "🌌 The Really Far Future",
        html`
            <p>You have reached the really far future!</p>
            <p>
                You have now earned more than ${integer_f.format(Number.MAX_SAFE_INTEGER)} seconds,
                which is the largest integer that can be represented in JavaScript without any loss
                of precision.
            </p>
            <p>
                The Solar System has completed a full revolution around the Milky Way. This is a
                good moment to start over.
            </p>
            <div class="field-row" style="justify-content: center">
                <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                    Start a New Game
                </button>
            </div>
        `,
        `$(${Action.DismissDialog}, ${Dialog.BeyondInteger})`
    );
}
