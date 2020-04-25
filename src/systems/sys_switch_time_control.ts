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

    // This whole system needs a little refactor...
    let first_action = time_control_component.Actions[0];
    if (first_action.StartTime >= current_time) {
        time_control_component.Current = 0;
        return;
    }

    for (let i = 0; i < time_control_component.Actions.length; i++) {
        let action = time_control_component.Actions[i];
        let previous_action = time_control_component.Actions[i - 1];
        if (action.StartTime <= current_time && action.FinishTime >= current_time) {
            time_control_component.Current = i;
            return;
        } else if (previous_action) {
            if (previous_action.FinishTime <= current_time && action.StartTime >= current_time) {
                time_control_component.Current = i - 1;
                return;
            }
        }
    }

    let last_action = time_control_component.Actions[time_control_component.Actions.length - 1];
    if (last_action.FinishTime <= current_time) {
        time_control_component.Current = time_control_component.Actions.length - 1;
    }
}
