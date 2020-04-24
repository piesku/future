import {Vec3} from "../../common/math.js";
import {camera} from "../components/com_camera.js";
import {time_control} from "../components/com_time_control.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export let levels_space = 8;

export function blueprint_camera(game: Game, position: Vec3, transition_time: number) {
    let end_position = position.slice() as Vec3;
    end_position[1] += levels_space;
    return <Blueprint>{
        Using: [time_control(transition_time - 100, transition_time, position, end_position)],
        Children: [
            {
                Rotation: [-0.28, 0.364, 0.116, 0.88],
                Using: [camera(1, 0.1, 1000)],
            },
        ],
    };
}
