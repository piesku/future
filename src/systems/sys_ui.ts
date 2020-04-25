import {df, human_time_long, tf} from "../../common/time.js";
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
    let clock = document.getElementById("time");
    if (clock) {
        clock.innerHTML = human_time_long(game.TimeEarned);
    }

    {
        let current = game.TimeEarned * 1000 + game.TimeStart;
        let date = document.getElementById("clock-current-date");
        if (date) {
            date.textContent = df.format(current);
        }
        let time = document.getElementById("clock-current-time");
        if (time) {
            time.textContent = tf.format(current);
        }
    }

    {
        let date = document.getElementById("clock-future-date");
        if (date) {
            date.textContent = df.format(game.TimeGoal);
        }
        let time = document.getElementById("clock-future-time");
        if (time) {
            time.textContent = tf.format(game.TimeGoal);
        }
    }
}
