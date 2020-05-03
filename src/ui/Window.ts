import {html} from "../../common/html.js";
import {integer} from "../../common/random.js";
import {Action, max_z_index} from "../actions.js";
import {Game} from "../game.js";

export function Window(game: Game, title: string, content: string, width = 250) {
    if (!game.WindowLayout[title]) {
        game.Dragging = undefined;
        switch (title) {
            case "Clock":
                game.WindowLayout[title] = [16, 16, 0];
                break;
            case "Era Progress":
                game.WindowLayout[title] = [16, game.ViewportWidth / 2 - 125, 0];
                break;
            case "Time Elapsed":
                game.WindowLayout[title] = [16, game.ViewportWidth - 266, 0];
                break;
            case "Income Statistics":
                game.WindowLayout[title] = [245, game.ViewportWidth - 266, 0];
                break;
            case "👉 Tick":
                game.WindowLayout[title] = [245, 16, 0];
                break;
            case "🌤️ Sundial":
                game.WindowLayout[title] = [337, 16, 0];
                break;
            default:
                game.WindowLayout[title] = [
                    game.ViewportHeight / 2 + integer(-100, 0),
                    game.ViewportWidth / 2 + integer(-250, 0),
                    max_z_index(game.WindowLayout) + 1,
                ];
        }
    }

    return html`
        <div
            class="window"
            style="
                width: ${width}px;
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
