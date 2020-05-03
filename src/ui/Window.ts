import {html} from "../../common/html.js";
import {integer} from "../../common/random.js";
import {Action, max_z_index} from "../actions.js";
import {Game} from "../game.js";

export function Window(game: Game, title: string, content: string, width = 250) {
    if (!game.WindowLayout[title]) {
        game.WindowLayout[title] = [
            integer(16, game.ViewportHeight / 2),
            integer(16, game.ViewportWidth - 316),
            max_z_index(game.WindowLayout) + 1,
        ];
        game.Dragging = undefined;
    }

    return html`
        <div
            class="window"
            style="
                width: ${width}px;
                margin: 16px;
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
            </div>
            <div class="window-body">
                ${content}
            </div>
        </div>
    `;
}
