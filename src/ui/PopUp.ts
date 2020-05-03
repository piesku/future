import {html} from "../../common/html.js";
import {Action, max_z_index} from "../actions.js";
import {Game} from "../game.js";

export function PopUp(game: Game, title: string, content: string, onclose: string) {
    if (!game.WindowLayout[title]) {
        game.WindowLayout[title] = [
            game.ViewportHeight / 2 - 50,
            game.ViewportWidth / 2 - 125,
            max_z_index(game.WindowLayout) + 1,
        ];
        game.Dragging = undefined;
    }

    return html`
        <div
            class="window"
            style="
                width: 250px;
                position: absolute;
                top: ${game.WindowLayout[title][0]}px;
                left: ${game.WindowLayout[title][1]}px;
                z-index: ${game.WindowLayout[title][2]};
            "
            onmousedown="event.stopPropagation(); $(${Action.BringToTop}, '${title}');"
            onmouseup="event.stopPropagation(); $(${Action.DraggingStop})"
        >
            <div class="title-bar" onmousedown="$(${Action.DraggingStart}, '${title}');">
                <div class="title-bar-text">
                    ${title}
                </div>
                <div class="title-bar-controls">
                    <button aria-label="Close" onmouseup="${onclose}"></button>
                </div>
            </div>
            <div class="window-body">
                ${content}
            </div>
        </div>
    `;
}
