import {Vec3} from "../../../common/math.js";
import {from_euler} from "../../../common/quat.js";
import {element, integer} from "../../../common/random.js";
import {render_textured} from "../../components/com_render_textured.js";
import {time_control} from "../../components/com_time_control.js";
import {Blueprint} from "../../core.js";
import {Game} from "../../game.js";

export const industrial_ground = (game: Game, x: number, y: number): Blueprint => ({
    Translation: [x, 0, y],
    Using: [render_textured(game.MaterialTextured, game.MeshCube, game.Textures.bricks)],
});

export let industrial_structure = (
    game: Game,
    start_time: number,
    end_time: number
): Array<Blueprint> => {
    let Children: Blueprint[] = [];
    let segments = integer(3, 6);

    let segment_time = (end_time - start_time) / segments;

    for (let i = 0; i < segments; i++) {
        Children.push({
            Translation: [0, -1, 0],
            Rotation: from_euler([0, 0, 0, 1], 0, element([0, 90, 180]), 0),
            Using: [
                render_textured(game.MaterialTextured, game.MeshCube, game.Textures.factory),
                time_control([
                    {
                        StartTime: start_time,
                        FinishTime: start_time + segment_time * i + segment_time,
                        StartPosition: [0, -1, 0] as Vec3,
                        TargetPosition: [0, i, 0] as Vec3,
                    },
                ]),
            ],
        });
    }

    return Children;
};
