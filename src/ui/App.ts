import {GameState} from "../actions.js";
import {scene_idle} from "../scenes/sce_idle.js";
import {Idle} from "./Idle.js";
import {PoC} from "./PoC.js";

export function App(state: GameState) {
    switch (state.CurrentScene) {
        case scene_idle:
            return Idle(state);
        default:
            return PoC(state);
    }
}
