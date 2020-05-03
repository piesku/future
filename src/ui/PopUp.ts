import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function PopUp(game: Game, title: string, content: string, onclose: string) {
    if (!game.WindowLayout[title]) {
        game.WindowLayout[title] = [0, 0, 0];
    }

    return html`
        <div
            class="window"
            style="
                width: 250px;
                margin: 40vh 16px 16px;
                position: absolute;
                top: ${game.WindowLayout[title][0]}px;
                left: ${game.WindowLayout[title][1]}px;
                z-index: ${game.WindowLayout[title][2]};
            "
            onmousedown="event.stopPropagation(); $(${Action.BringToTop}, '${title}');"
            onmouseup="event.stopPropagation();"
        >
            <div
                class="title-bar"
                onmousedown="$(${Action.DraggingStart}, '${title}');"
                onmouseup="$(${Action.DraggingStop});"
            >
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
