import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform | Has.TimeControl;

export function sys_switch_time_control(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let time_control_component = game.World.TimeControl[entity];
    if (time_control_component.Actions.length < 2) {
        return;
    }

    if (!time_control_component) {
        return;
    }

    let current_time = game.TimeEarned;

    for (let i = 0; i < time_control_component.Actions.length; i++) {
        let action = time_control_component.Actions[i];

        if (action.StartTime <= current_time && action.FinishTime >= current_time) {
            time_control_component.Current = i;
            return;
        }
    }
}
