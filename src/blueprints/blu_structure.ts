import {Blueprint} from "../core.js";
import {Game} from "../game.js";
import {prehistory_structure} from "./eras/0_prehistory.js";
import {ancient_structure} from "./eras/1_ancient.js";
import {medieval_structure} from "./eras/2_medieval.js";
import {renaissance_structure} from "./eras/3_renaissance.js";

let structures_by_era = [
    prehistory_structure,
    ancient_structure,
    medieval_structure,
    renaissance_structure,
];

export function blueprint_structure(
    game: Game,
    x: number,
    y: number,
    start_time: number,
    end_time: number,
    era: number
) {
    let era_generator = structures_by_era[era % structures_by_era.length];

    return <Blueprint>{
        Translation: [x, -2, y],
        Children: era_generator(game, start_time, end_time),
    };
}
