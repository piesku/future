import {html} from "../../common/html.js";
import {Game} from "../game.js";
import {Generator} from "./Generator.js";

export function Idle(game: Game) {
    return html`
        <h1 style="color: #fff;"></h1>
        <div
            style="
                width: 250px;
            "
        >
            ${game.Generators.map((gen, idx) => Generator(game, gen, idx))}
        </div>
    `;
}
