import {html} from "../../common/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function Window(game: Game, title: string, content: string, width = 250) {
    return html`
        <div
            class="window"
            style="
                width: ${width}px;
                margin: 16px;
                ${game.WindowPositions[title] &&
            `
                    position: relative;
                    top: ${game.WindowPositions[title][0]}px;
                    left: ${game.WindowPositions[title][1]}px;
                    z-index: ${game.WindowPositions[title][2]};
                `}
            "
            onmousedown="$(${Action.BringToTop}, '${title}');"
        >
            <div
                class="title-bar"
                onmousedown="$(${Action.DraggingStart}, '${title}');"
                onmouseup="event.stopPropagation(); $(${Action.DraggingStop});"
            >
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
