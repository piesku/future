import {Vec3} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface TimeControlActionOrWhateva {
    StartTime: number;
    FinishTime: number;
    StartPosition: Vec3;
    TargetPosition: Vec3;
}
export interface TimeControl {
    Current: number;
    Actions: Array<TimeControlActionOrWhateva>;
}

export function time_control(actions: Array<TimeControlActionOrWhateva>) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.TimeControl;
        game.World.TimeControl[entity] = {
            Current: 0,
            Actions: actions,
        };
    };
}
