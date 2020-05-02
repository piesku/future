import {html} from "../../common/html.js";
import {integer_f} from "../../common/number.js";
import {Action, Dialog} from "../actions.js";

export function BeyondInteger() {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 30px); left: calc(50% - 105px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    🌌 The Really Far Future
                </div>
                <div class="title-bar-controls">
                    <button
                        aria-label="Close"
                        onmouseup="event.stopPropagation(); $(${Action.DismissDialog}, ${Dialog.BeyondInteger})"
                    ></button>
                </div>
            </div>
            <div class="window-body">
                <p>You have reached the really far future!</p>
                <p>
                    You have now earned more than ${integer_f.format(Number.MAX_SAFE_INTEGER)}
                    seconds, which is the largest integer that can be represented in JavaScript
                    without any loss of precision.
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
            </div>
        </div>
    `;
}
