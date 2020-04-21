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
        transform.Dirty = true;
        transform.Translation = time_control.TargetPosition;
        transform.Scale = [1, 1, 1];
        return;
    } else if (current_time < time_control.StartTime) {
        transform.Dirty = true;
        transform.Translation = time_control.StartPosition;
        transform.Scale = [0.9, 0.9, 0.9];
        return;
    }

    transform.Dirty = true;

    // let progress = Math.min(1, current_time / (time_control.FinishTime - time_control.StartTime));
    let progress =
        (current_time - time_control.StartTime) /
        (time_control.FinishTime - time_control.StartTime);

    transform.Translation = lerp(
        [0, 0, 0],
        time_control.StartPosition,
        time_control.TargetPosition,
        progress
    );
    lerp(transform.Scale, [0.9, 0.9, 0.9], [1, 1, 1], progress);
}
