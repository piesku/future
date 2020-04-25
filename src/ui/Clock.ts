import {html} from "../../common/html.js";
import {Game} from "../game.js";

export function Clock(game: Game) {
    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Clock
                </div>
            </div>
            <div class="window-body">
                <p>To win the game, reach the future!</p>
                <fieldset class="field-row">
                    <legend>
                        Current Game Time
                    </legend>
                    <div class="field-row">
                        ${new Date(game.TimeEarned * 1000 + game.TimeStart).toString()}
                    </div>
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Goal
                    </legend>
                    <div class="field-row">
                        ${new Date(game.TimeGoal).toString()}
                    </div>
                </fieldset>
            </div>
        </div>
    `;
}
