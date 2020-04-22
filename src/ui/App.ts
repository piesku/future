import {GameState} from "../actions.js";
import {PoC} from "./PoC.js";

export function App(state: GameState) {
    switch (state.CurrentScene) {
        default:
            return PoC(state);
    }
}
