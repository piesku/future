import {html} from "../../common/html.js";

export function Clock() {
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
                        <div
                            id="clock-current-date"
                            style="width: 200px; text-align: center;"
                        ></div>
                        <div id="clock-current-time" style="width: 50px; text-align: center;"></div>
                    </div>
                </fieldset>
                <fieldset class="field-row">
                    <legend>
                        Goal Date
                    </legend>
                    <div class="field-row" style="justify-content: space-evenly;">
                        <div id="clock-future-date" style="width: 200px; text-align: center;"></div>
                        <div id="clock-future-time" style="width: 50px; text-align: center;"></div>
                    </div>
                </fieldset>
            </div>
        </div>
    `;
}
