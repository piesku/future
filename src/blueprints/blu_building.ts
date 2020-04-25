import {Vec3} from "../../common/math.js";
import {integer} from "../../common/random.js";
import {render_textured} from "../components/com_render_textured.js";
import {time_control} from "../components/com_time_control.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_building(
    game: Game,
    x: number,
    y: number,
    start: number,
    finish: number,
    texture: WebGLTexture
) {
    let Children: Blueprint[] = [];
    let segments = integer(4, 6);

    let segment_time = (finish - start) / segments;
    let face_segment = segments - 2;

    for (let i = 0; i < segments; i++) {
        Children.push({
            // Scale: [0.9, 0.9, 0.9],
            // Translation: [0, i, 0],
            Translation: [0, -1, 0],
            Using: [
                render_textured(
                    game.MaterialTextured,
                    game.MeshCube,
                    face_segment == i ? game.Textures.stone2 : texture
                ),
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
