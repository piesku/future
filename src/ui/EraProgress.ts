import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {ERAS} from "../config.js";
import {Game} from "../game.js";
import {Window} from "./Window.js";

export function EraProgress(game: Game) {
    let current_era = ERAS[game.EraCurrent];
    let next_era = ERAS[game.EraCurrent + 1];
    if (!next_era) {
        return null;
    }

    return Window(
        game,
        "Era Progress",
        html`
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
                    title="You'll start from scratch, but you'll earn time faster."
                >
                    Advance to the ${next_era.Name}
                </button>
            </div>
        `
    );
}
