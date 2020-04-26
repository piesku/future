import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {ERAS} from "../config.js";
import {Game} from "../game.js";

export function EraProgress(game: Game) {
    let current_era = ERAS[game.EraCurrent];
    let next_era = ERAS[game.EraCurrent + 1];
    if (!next_era) {
        return null;
    }

    return html`
        <div class="window" style="margin: 16px; width: 250px">
            <div class="title-bar">
                <div class="title-bar-text">
                    Era Progress
                </div>
            </div>
            <div class="window-body">
                <fieldset class="field-row">
                    <legend>
                        ${current_era.Name}
                    </legend>

                    <div class="field-row">
                        <progress value="${game.TpsCurrent}" max="${next_era.TpsRequired}">
                            ${game.TpsCurrent / next_era.TpsRequired}
                        </progress>
                    </div>
                </fieldset>
                <div class="field-row" style="justify-content: center">
                    <button
                        onmouseup="event.stopPropagation(); $(${Action.AdvanceEra});"
                        ${game.TpsCurrent < next_era.TpsRequired ? "disabled" : ""}
                    >
                        Advance to the ${next_era.Name}
                    </button>
                </div>
            </div>
        </div>
    `;
}
