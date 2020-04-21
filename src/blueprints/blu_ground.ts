import {float} from "../../common/random.js";
import {render_diffuse} from "../components/com_render_diffuse.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_ground(game: Game, width: number, height: number) {
    let Children: Blueprint[] = [];

    for (let x = -width / 2; x < width / 2; x++) {
        for (let y = -height / 2; y < height / 2; y++) {
            Children.push({
                Translation: [x, 0, y],
                Using: [
                    render_diffuse(game.MaterialDiffuseGouraud, game.MeshCube, [
                        1,
                        Math.min(1, 0.8 + float() * 0.3),
                        0.1 + float() * 0.4,
                        1,
                    ]),
                ],
            });
        }
    }
    return <Blueprint>{
        Children,
    };
}
