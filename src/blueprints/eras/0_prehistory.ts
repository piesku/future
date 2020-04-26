import {Vec3} from "../../../common/math.js";
import {from_euler} from "../../../common/quat.js";
import {element, float, integer} from "../../../common/random.js";
import {render_textured} from "../../components/com_render_textured.js";
import {time_control} from "../../components/com_time_control.js";
import {Blueprint} from "../../core.js";
import {Game} from "../../game.js";

let has_special = false;

export let prehistory_ground = (game: Game, x: number, y: number): Blueprint => ({
    Translation: [x, 0, y],
    Rotation: from_euler([0, 0, 0, 1], 0, element([0, 90, 180]), 0),
    Using: [render_textured(game.MaterialTextured, game.MeshCube, game.Textures.grass)],
});

export let prehistory_structure = (
    game: Game,
    start_time: number,
    end_time: number
): Array<Blueprint> => {
    let texture = game.Textures.stone;
    let special_texture = game.Textures.stone2;

    let Children: Blueprint[] = [];
    let segments = integer(2, 5);

    let segment_time = (end_time - start_time) / segments;

    for (let i = 0; i < segments; i++) {
        let is_special = !has_special && segments >= 5 && i === segments - 2 && float() > 0.5;
        if (is_special) {
            has_special = true;
        }

        Children.push({
            Translation: [0, -1, 0],
            Using: [
                render_textured(
                    game.MaterialTextured,
                    game.MeshCube,
                    is_special ? special_texture : texture
                ),
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
