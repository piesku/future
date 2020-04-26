import {Vec3, Vec4} from "../../common/math.js";
import {float, integer} from "../../common/random.js";
import {human_time_short} from "../../common/time.js";
import {blueprint_camera, levels_space} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {blueprint_structure} from "../blueprints/blu_structure.js";
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

    let eras_count = 5;
    let worlds_per_era = 3;
    let world_transition_times = [];
    let last_world_end_time = 0;
    let world_end = 0;

    for (let era = 0; era < eras_count; era++) {
        for (let world = 0; world < worlds_per_era; world++) {
            let taken_fields: Array<{x: number; y: number}> = [];

            let buildings_count = integer(10, 30);
            let buildings = [];
            world_end = 0;
            for (let i = 0; i < buildings_count; i++) {
                let x = integer(-4, 3);
                let y = integer(-4, 3);

                while (taken_fields.some((point) => point.x === x && point.y === y)) {
                    x = integer(-4, 3);
                    y = integer(-4, 3);
                }

                taken_fields.push({
                    x,
                    y,
                });

                let start_time = last_world_end_time + i * integer(1, 3) * 60;
                let end_time = start_time + (i ? i : 0.5) * integer(360, 1200) * ((world + 1) * 2);
                world_end = Math.max(world_end, end_time);
                buildings.push(blueprint_structure(game, x, y, start_time, end_time, era));
            }

            instantiate(game, {
                Translation: [(era * worlds_per_era + world) * levels_space + 20, 0, 0],
                Using: [
                    time_control([
                        {
                            StartTime: last_world_end_time - 100,
                            FinishTime: last_world_end_time,
                            StartPosition: [
                                (era * worlds_per_era + world) * levels_space + 20,
                                0,
                                0,
                            ] as Vec3,
                            TargetPosition: [
                                (era * worlds_per_era + world) * levels_space,
                                0,
                                0,
                            ] as Vec3,
                        },
                    ]),
                ],
                Children: [
                    {
                        Translation: [0, -3, 0],
                        ...blueprint_ground(game, 8, era),
                    },
                    ...buildings,
                ],
            });

            // era_end *= 1.05;
            last_world_end_time += world_end;
            console.log(human_time_short(last_world_end_time), {
                buildings_count,
            });

            world_transition_times.push(last_world_end_time);
        }
    }

    world_transition_times.pop();
    // Camera.
    instantiate(game, blueprint_camera(game, [6, 5, 8], world_transition_times));
}
