import {render_textured} from "../../components/com_render_textured.js";
import {Blueprint} from "../../core.js";
import {Game} from "../../game.js";

export const ancient_ground = (game: Game, x: number, y: number): Blueprint => ({
    Translation: [x, 0, y],
    // Rotation: from_euler([0, 0, 0, 1], 0, element([0, 90, 180]), 0),
    Using: [render_textured(game.MaterialTextured, game.MeshCube, game.Textures.sandstone)],
});
