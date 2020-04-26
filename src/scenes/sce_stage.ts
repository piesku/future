import {Vec3, Vec4} from "../../common/math.js";
import {float, integer} from "../../common/random.js";
import {human_time_short} from "../../common/time.js";
import {blueprint_building} from "../blueprints/blu_building.js";
import {blueprint_camera, levels_space} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {light_directional} from "../components/com_light.js";
import {time_control} from "../components/com_time_control.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

let building_color_functions: Array<() => Vec4> = [
    () => {
        let color = float(0.2, 0.7);
        return [color, color, color, 1];
    },
    () => {
        let color = float(0.2, 0.7);
        return [color, color * color, color * color, 1];
    },
    () => {
        let color = float(0.2, 0.7);
        return [color * color, color, color * color, 1];
    },
    () => {
        let color = float(0.2, 0.7);
        return [color, color * color, color, 1];
    },
    () => {
        let color = float(0.2, 0.7);
        return [color * color, color * color, color, 1];
    },
    () => {
        let color = float(0.2, 0.7);
        return [color * color, color, color, 1];
    },
];

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.GL.clearColor(0, 0.5, 0.8, 1);

    // Light.
    instantiate(game, {
        Translation: [2, 3, 5],
        Using: [light_directional([1, 1, 1], 1)],
    });

    let eras_count = 2;
    let eras_transition_times = [];
    let last_era_end_time = 0;
    let era_end = 0;

    for (let e = 0; e < eras_count; e++) {
        let buildings_count = integer(10, 20);
        let buildings = [];
        let color_index = e % building_color_functions.length;
        era_end = 0;
        for (let i = 0; i < buildings_count; i++) {
            let start_time = last_era_end_time + i * integer(1, 3) * 60;
            let end_time = start_time + (i ? i : 0.5) * integer(360, 1200) * ((e + 1) * 2);
            era_end = Math.max(era_end, end_time);
            buildings.push(
                blueprint_building(game, integer(-4, 3), integer(-4, 3), start_time, end_time)
            );
        }

        instantiate(game, {
            Translation: [e * levels_space + 20, 0, 0],
            Using: [
                time_control([
                    {
                        StartTime: last_era_end_time - 100,
                        FinishTime: last_era_end_time,
                        StartPosition: [e * levels_space + 20, 0, 0] as Vec3,
                        TargetPosition: [e * levels_space, 0, 0] as Vec3,
                    },
                ]),
            ],
            Children: [
                {
                    Translation: [0, -3, 0],
                    ...blueprint_ground(game, 8, e),
                },
                ...buildings,
            ],
        });

        // era_end *= 1.05;
        last_era_end_time += era_end;
        console.log(human_time_short(last_era_end_time));
        eras_transition_times.push(last_era_end_time);
    }

    eras_transition_times.pop();

    // Camera.
    instantiate(game, blueprint_camera(game, [6, 5, 8], eras_transition_times));
}
