import {html} from "../../common/html.js";
import {Action, Dialog} from "../actions.js";
import {Game} from "../game.js";
import {PopUp} from "./PopUp.js";

export function Victory(game: Game) {
    return PopUp(
        game,
        "✨ Victory",
        html`
            <p>You won!</p>
            <p>
                Congratulations, you have reached the future!
            </p>
            <p>
                Building the civilization's future requires hard work and lots of time. Your people
                are grateful to you, their sage leader. Well done!
            </p>
            <div class="field-row" style="justify-content: center">
                <button
                    onmouseup="event.stopPropagation(); $(${Action.DismissDialog}, ${Dialog.Victory});"
                >
                    Continue Playing
                </button>
                <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                    Start a New Game
                </button>
            </div>
        `,
        `$(${Action.DismissDialog}, ${Dialog.Victory})`
    );
}
