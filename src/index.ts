import {dispatch} from "./actions.js";
import {load_texture, loop_start} from "./core.js";
import {Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";

let textures = ["grass"];

let game = new Game();
// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;

let texture_promises = textures.map(
    async (file: string) =>
        new Promise((resolve, reject) => {
            let texture = new Image();
            texture.src = `/textures/${file}.jpg`;
            texture.onload = () => {
                game.Textures[file] = load_texture(game, texture);
                resolve();
            };
        })
);

Promise.all(texture_promises).then(() => {
    scene_stage(game);
    loop_start(game);
});
