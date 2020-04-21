import {integer} from "../../common/random.js";
import {blueprint_building} from "../blueprints/blu_building.js";
import {blueprint_camera} from "../blueprints/blu_camera.js";
import {blueprint_ground} from "../blueprints/blu_ground.js";
import {light_directional} from "../components/com_light.js";
import {instantiate} from "../core.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();
    game.Camera = undefined;
    game.ViewportResized = true;
    game.GL.clearColor(0, 0.5, 0.8, 1);

    // Camera.
    instantiate(game, {
        Translation: [7, 5, 7],
        ...blueprint_camera(game),
    });

    // Light.
    instantiate(game, {
        Translation: [2, 3, 5],
        Using: [light_directional([1, 1, 1], 1)],
    });

    // Ground.
    instantiate(game, {
        Translation: [0, -3, 0],
        ...blueprint_ground(game, 8, 8),
    });

    // Props
    let buildings = integer(5, 10);

    for (let i = 0; i < buildings; i++) {
        let start_time = i * integer(5, 25);
        instantiate(
            game,
            blueprint_building(
                game,
                integer(-4, 3),
                integer(-4, 3),
                start_time,
                start_time + integer(30, 120)
            )
        );
    }
}
