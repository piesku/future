import {html} from "../../common/html.js";
import {human_time_short} from "../../common/time.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Generator} from "./Generator.js";

export function Idle(game: Game) {
    let tps = 0;
    for (let gen of game.Generators) {
        if (gen.Config.Kind === "auto") {
            tps += income(gen.Config, gen.Count);
        }
    }

    return html`
        <h1 style="color: #fff;">Current time: <span /></h1>
        <h2 style="color: #fff;">
            Current <abbr title="time per second">tps</abbr>: ${human_time_short(tps)}
        </h1>
        <div
            style="
                width: 250px;
            "
        >
            ${game.Generators.map((gen, idx) => Generator(game, gen, idx))}
        </div>
    `;
}
