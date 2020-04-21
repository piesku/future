import {lerp} from "../../common/vec3.js";
import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform | Has.TimeControl;

export function sys_time_control(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let time_control = game.World.TimeControl[entity];
    let transform = game.World.Transform[entity];

    let current_time = game.Seconds;

    if (current_time >= time_control.FinishTime) {
        console.log("building ready");
        return;
    } else {
        // console.log("elo");
    }

    transform.Dirty = true;

    // let progress = Math.min(1, current_time / (time_control.FinishTime - time_control.StartTime));
    let progress = current_time / (time_control.FinishTime - time_control.StartTime);
    lerp(transform.Translation, time_control.StartPosition, time_control.TargetPosition, progress);
}
