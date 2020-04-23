import {GameState} from "../actions.js";
import {Idle} from "./Idle.js";

export function App(state: GameState) {
    return Idle(state);
}
