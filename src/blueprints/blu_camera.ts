import {camera} from "../components/com_camera.js";
import {Blueprint} from "../core.js";
import {Game} from "../game.js";

export function blueprint_camera(game: Game) {
    return <Blueprint>{
        Children: [
            {
                Rotation: [-0.28, 0.364, 0.116, 0.88],
                Using: [camera(1, 0.1, 1000)],
            },
        ],
    };
}
