import {html} from "../../common/html.js";
import {integer_f} from "../../common/number.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function BeyondFloat(game: Game) {
    return PopUp(
        game,
        "🌠 Beyond Future",
        html`
            <p>You have gone beyond the future!</p>
            <p style="overflow-wrap: anywhere;">
                You have now earned more than ${integer_f.format(Number.MAX_VALUE)} seconds, which
                is the largest number that can be represented in JavaScript.
            </p>
            <p><em>Nice</em>.</p>
            <p>
                All
                <a href="https://en.wikipedia.org/wiki/Timeline_of_the_far_future">
                    nucleons in the observable universe decayed</a
                >
                eons ago. It's time for a new Big Bang.
            </p>
            <div class="field-row" style="justify-content: center">
                <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                    Start a New Game
                </button>
            </div>
        `,
        `$(${Action.DismissDialog}, ${Dialog.BeyondFloat})`
    );
}
