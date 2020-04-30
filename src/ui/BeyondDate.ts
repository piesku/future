import {html} from "../../common/html.js";
import {MAX_SECONDS, years_from} from "../../common/time.js";
import {Action, Dialog} from "../actions.js";

export function BeyondDate() {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 40px); left: calc(50% - 115px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    🚀 The Far Future
                </div>
                <div class="title-bar-controls">
                    <button
                        aria-label="Close"
                        onmouseup="event.stopPropagation(); $(${Action.DismissDialog}, ${Dialog.BeyondDate})"
                    ></button>
                </div>
            </div>
            <div class="window-body">
                <p>You have reached the far future!</p>
                <p>
                    JavaScript cannot properly format dates larger than ${years_from(MAX_SECONDS)}.
                    From now on the clock will only show years into the future.
                </p>
                <p>
                    Lōʻihi, the youngest volcano in the Hawaiian–Emperor seamount chain, has risen
                    above the surface of the ocean and has become a new volcanic island.
                </p>
                <div class="field-row" style="justify-content: center">
                    <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                        Start a New Game
                    </button>
                </div>
            </div>
        </div>
    `;
}
