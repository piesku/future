import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Window} from "./Window.js";

export function Score(game: Game) {
    return Window(
        game,
        "Time Elapsed",
        html` <h3 id="time" style="margin: 0; overflow: hidden; text-overflow: ellipsis;"></h3> `
    );
}
