import {Vec3, Vec4} from "../../common/math.js";
import {integer} from "../../common/random.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {time_control} from "../components/com_time_control.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_building(
    game: Game,
    x: number,
    y: number,
    start: number,
    finish: number,
    color: () => Vec4
) {
    let Children: Blueprint[] = [];
    let segments = integer(2, 5);

    let segment_time = (finish - start) / segments;

    for (let i = 0; i < segments; i++) {
        Children.push({
            // Scale: [0.9, 0.9, 0.9],
            // Translation: [0, i, 0],
            Translation: [0, -1, 0],
            Using: [
                render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, color()),
                time_control([
                    {
                        StartTime: start,
                        FinishTime: start + segment_time * i + segment_time,
                        StartPosition: [0, -1, 0] as Vec3,
                        TargetPosition: [0, i, 0] as Vec3,
                    },
                ]),
            ],
        });
    }

    return <Blueprint>{
        Translation: [x, -2, y],
        Children,
    };
}
