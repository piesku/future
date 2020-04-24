import {Vec3} from "../../common/math.js";
import {camera} from "../components/com_camera.js";
import {time_control} from "../components/com_time_control.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export let levels_space = 8;

export function blueprint_camera(game: Game, position: Vec3, transition_times: Array<number>) {
    let time_control_actions = [];

    for (let i = 0; i < transition_times.length; i++) {
        let start_position = position.slice() as Vec3;
        start_position[1] += levels_space * i;
        let end_position = position.slice() as Vec3;
        end_position[1] += levels_space * (i + 1);

        let transition_time = transition_times[i];
        time_control_actions.push({
            StartTime: transition_time - 100,
            FinishTime: transition_time,
            StartPosition: start_position,
            TargetPosition: end_position,
        });
    }
    return <Blueprint>{
        Using: [time_control(time_control_actions)],
        Children: [
            {
                Rotation: [-0.28, 0.364, 0.116, 0.88],
                Using: [camera(1, 0.1, 1000)],
            },
        ],
    };
}
