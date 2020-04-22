import {dispatch} from "./actions.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";
import {scene_idle} from "./scenes/sce_idle.js";

let game = new Game();
scene_idle(game);
loop_start(game);

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
