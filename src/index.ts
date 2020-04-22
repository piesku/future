import {dispatch} from "./actions.js";
import {loop_start} from "./core.js";
import {Game} from "./game.js";
import {scene_poc} from "./scenes/sce_poc.js";

let game = new Game();
scene_poc(game);
loop_start(game);

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
