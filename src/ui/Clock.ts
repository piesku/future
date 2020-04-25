import {html} from "../../common/html.js";
import {Game} from "../game.js";

let df = new Intl.DateTimeFormat("en-US", {
    era: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
});

let tf = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
});

export function Clock(game: Game) {
    let time = game.TimeEarned * 1000 + game.TimeStart;
    return html`
        <div class="window" style="margin: 32px; width: 300px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Clock
                </div>
            </div>
            <div class="window-body">
                <p>To win the game, reach the future!</p>
                <fieldset class="field-row">
                    <legend>
                        Current Date
                    </legend>
                    <div class="field-row" style="justify-content: space-evenly;">
                        <div style="width: 150px; text-align: center;">
                            ${df.format(time)}
                        </div>
                        <div style="width: 50px; text-align: center;">
                            ${tf.format(time)}
                        </div>
                    </div>
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Goal Date
                    </legend>
                    <div class="field-row" style="justify-content: space-evenly;">
                        <div>
                            ${df.format(game.TimeGoal)}
                        </div>
                        <div>
                            ${tf.format(game.TimeGoal)}
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    `;
}
