import {html} from "../../common/html.js";
import {MAX_SECONDS} from "../../common/time.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function Clock(game: Game) {
    return html`
        <div class="window" style="margin: 16px; width: 300px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Clock
                </div>
            </div>
            <div class="window-body">
                ${game.HasWon
                    ? `<p>Congratulations! You have reached the future.</p>`
                    : `<p>To win the game, reach the future!</p>`}
                <fieldset class="field-row">
                    <legend>
                        Current Date
                    </legend>
                    ${game.DateCurrent > MAX_SECONDS
                        ? `<div class="field-row" style="justify-content: space-evenly;">
                            <div style="">Years into the far future:</div>
                            <div
                                id="clock-current-year"
                                style="
                                    width: 75px;
                                    text-align: center;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                "></div>
                        </div>`
                        : `<div class="field-row" style="justify-content: space-evenly;">
                            <div id="clock-current-year" style="width: 60px; text-align: center;"></div>
                            <div id="clock-current-day" style="width: 140px; text-align: center;"></div>
                            <div id="clock-current-time" style="width: 50px; text-align: center;"></div>
                        </div>
                    `}
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Goal Date
                    </legend>
                    <div class="field-row" style="justify-content: space-evenly;">
                        <div id="clock-future-year" style="width: 60px; text-align: center;"></div>
                        <div id="clock-future-day" style="width: 140px; text-align: center;"></div>
                        <div id="clock-future-time" style="width: 50px; text-align: center;"></div>
                    </div>
                </fieldset>
                ${game.HasWon &&
                `
                    <div class="field-row" style="justify-content: center;">
                        <button onmouseup="event.stopPropagation(); $(${Action.StartNewGame});">
                            Start a New Game
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}
