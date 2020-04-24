import {Vec4} from "../../common/math.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_ground(game: Game, size: number, color: () => Vec4) {
    let Children: Blueprint[] = [];

    for (let x = -size / 2; x < size / 2; x++) {
        for (let y = -size / 2; y < size / 2; y++) {
            Children.push(
                {
                    Translation: [x, 0, y],
                    Using: [render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, color())],
                },
                {
                    Translation: [x, -(y + size / 2), size / 2 - 1],
                    Using: [render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, color())],
                },
                {
                    Translation: [size / 2 - 1, -(y + size / 2), x],
                    Using: [render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, color())],
                }
            );
        }
    }
    return <Blueprint>{
        Children,
    };
}
