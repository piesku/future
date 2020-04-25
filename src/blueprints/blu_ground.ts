import {from_euler} from "../../common/quat.js";
import {element} from "../../common/random.js";
import {render_textured} from "../components/com_render_textured.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_ground(game: Game, size: number, texture: WebGLTexture) {
    let Children: Blueprint[] = [];

    for (let x = -size / 2; x < size / 2; x++) {
        for (let y = -size / 2; y < size / 2; y++) {
            Children.push({
                Translation: [x, 0, y],
                Rotation: from_euler([0, 0, 0, 1], 0, element([0, 90, 180]), 0),
                Using: [render_textured(game.MaterialTextured, game.MeshCube, texture)],
            });
        }
    }
    return <Blueprint>{
        Children,
    };
}
