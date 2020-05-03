import {html} from "../../common/html.js";
import {MAX_SECONDS, years_from} from "../../common/time.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function BeyondDate(game: Game) {
    return PopUp(
        game,
        "🚀 The Far Future",
        html`
            <p>You have reached the far future!</p>
            <p>
                JavaScript cannot properly format dates larger than ${years_from(MAX_SECONDS)}. From
                now on the clock will only show years into the future.
            </p>
            <p>
                Lōʻihi, the youngest volcano in the Hawaiian–Emperor seamount chain, has risen above
                the surface of the ocean and has become a new volcanic island.
            </p>
            <div class="field-row" style="justify-content: center">
                <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                    Start a New Game
                </button>
            </div>
        `,
        `$(${Action.DismissDialog}, ${Dialog.BeyondDate})`
    );
}
