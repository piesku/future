import {Game} from "../game.js";
import {App} from "../ui/App.js";

let prev: string;

export function sys_ui(game: Game, delta: number) {
    let next = App(game);
    if (next !== prev) {
        game.UI.innerHTML = prev = next;
    }

    // We need to render the time earned outside App; otherwise App's output
    // would be different each frame, making it imossible to click any buttons.
    let counter = document.querySelector("h1");
    if (counter) {
        counter.textContent = game.TimeEarned.toFixed(2);
    }
}
