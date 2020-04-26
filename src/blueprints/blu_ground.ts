import {Blueprint} from "../core.js";
import {Game} from "../game.js";
import {prehistory_ground} from "./eras/0_prehistory.js";
import {ancient_ground} from "./eras/1_ancient.js";
import {medieval_ground} from "./eras/2_medieval.js";
import {renaissance_ground} from "./eras/3_renaissance.js";
import {industrial_ground} from "./eras/4_industrial.js";

const grounds_by_era = [
    prehistory_ground,
    ancient_ground,
    medieval_ground,
    renaissance_ground,
    industrial_ground,
];

export function blueprint_ground(game: Game, size: number, era: number) {
    let Children: Blueprint[] = [];
    let era_generator = grounds_by_era[era % grounds_by_era.length];
    for (let x = -size / 2; x < size / 2; x++) {
        for (let y = -size / 2; y < size / 2; y++) {
            Children.push(era_generator(game, x, y));
        }
    }
    return <Blueprint>{
        Children,
    };
}
