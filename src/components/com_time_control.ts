import {Vec3} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface TimeControl {
    StartTime: number;
    FinishTime: number;
    StartPosition: Vec3;
    TargetPosition: Vec3;
}

export function time_control(
    StartTime: number,
    FinishTime: number,
    StartPosition: Vec3,
    TargetPosition: Vec3
) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.TimeControl;
        game.World.TimeControl[entity] = {
            StartTime,
            FinishTime,
            StartPosition,
            TargetPosition,
        };
    };
}
