import {html} from "../../common/html.js";
import {integer_f} from "../../common/number.js";
import {Action} from "../actions.js";

export function BeyondFloat() {
    return html`
        <div
            class="window"
            style="width: 250px; position: absolute; top: calc(50% - 50px); left: calc(50% - 125px);"
        >
            <div class="title-bar">
                <div class="title-bar-text">
                    🌠 Beyond Future
                </div>
            </div>
            <div class="window-body">
                <p>You have reached beyond the future!</p>
                <p style="overflow-wrap: anywhere;">
                    You have now earned more than ${integer_f.format(Number.MAX_VALUE)} seconds,
                    which is the largest number which can be represented in JavaScript.
                </p>
                <p><em>Nice</em>.</p>
                <p>
                    All
                    <a href="https://en.wikipedia.org/wiki/Timeline_of_the_far_future">
                        nucleons in the observable universe decayed</a
                    >
                    eons ago. How about starting a new game?
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
