import {Blueprint} from "../core.js";
import {Game} from "../game.js";
import {prehistory_structure} from "./eras/0_prehistory.js";

export function blueprint_building(
    game: Game,
    x: number,
    y: number,
    start_time: number,
    end_time: number
) {
    return <Blueprint>{
        Translation: [x, -2, y],
        Children: prehistory_structure(game, start_time, end_time),
    };
}
