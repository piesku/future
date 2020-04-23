import {float, integer} from "../../common/random.js";
import {human_time_long} from "../../common/time.js";
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
        Translation: [6, 5, 8],
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
    let buildings = 2;
    // let buildings = integer(20, 30);

    let era_end = 0;
    for (let i = 0; i < buildings; i++) {
        let start_time = i * integer(1, 3) * 60;
        let end_time = start_time + (i ? i : 0.5) * integer(360, 1200);
        era_end = Math.max(era_end, end_time);
        instantiate(
            game,
            blueprint_building(game, integer(-4, 3), integer(-4, 3), start_time, end_time, () => {
                let color = float(0.2, 0.7);
                return [color, color, color, 1];
            })
        );
    }

    console.log(human_time_long(era_end));
}
