import {seconds_to_time} from "../../common/time.js";
import {Game} from "../game.js";
import {App} from "../ui/App.js";

let prev: string;

export function sys_ui(game: Game, delta: number) {
    let next = App(game);
    if (next !== prev) {
        game.UI.innerHTML = prev = next;
    }

    // We need to write TimeEarned outside the App component; otherwise App's
    // output would be different each frame, forcing its re-renders and making
    // it impossible to click any buttons.
    let counter = document.querySelector("h1");
    if (counter) {
        counter.textContent = `${game.TimeEarned.toFixed(2)} s`;
    }

    let clock = document.querySelector("h2");
    if (clock) {
        clock.textContent = seconds_to_time(game.TimeEarned);
    }
}
