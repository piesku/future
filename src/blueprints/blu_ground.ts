import {Blueprint} from "../core.js";
import {Game} from "../game.js";
import {prehistory_ground} from "./eras/0_prehistory.js";
import {ancient_ground} from "./eras/1_ancient.js";

const grounds_by_era = [prehistory_ground, ancient_ground];
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
