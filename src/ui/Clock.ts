import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Game} from "../game.js";

export function Clock(game: Game, total_income: number) {
    return html`
        <div class="window" style="margin: 32px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Time Info
                </div>
            </div>
            <div class="window-body">
                <fieldset class="field-row">
                    <legend>
                        Goal
                    </legend>
                    <div class="field-row">
                        ${new Date(game.TimeGoal).toString()}
                    </div>
                </fieldset>
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
                        Time Earned
                    </legend>
                    <div class="field-row">
                        <span id="time" />
                    </div>
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Time per Second
                    </legend>
                    <div class="field-row">
                        ${human_time_short(total_income)}
                    </div>
                </fieldset>
            </div>
        </div>
    `;
}
