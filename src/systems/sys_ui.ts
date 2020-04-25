import {day_f, human_time_long, time_f, year_f} from "../../common/time.js";
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
        let year = document.getElementById("clock-current-year");
        if (year) {
            year.textContent = year_f.format(current);
        }
        let day = document.getElementById("clock-current-day");
        if (day) {
            day.textContent = day_f.format(current);
        }
        let time = document.getElementById("clock-current-time");
        if (time) {
            time.textContent = time_f.format(current);
        }
    }

    {
        let year = document.getElementById("clock-future-year");
        if (year) {
            year.textContent = year_f.format(game.TimeGoal);
        }
        let day = document.getElementById("clock-future-day");
        if (day) {
            day.textContent = day_f.format(game.TimeGoal);
        }
        let time = document.getElementById("clock-future-time");
        if (time) {
            time.textContent = time_f.format(game.TimeGoal);
        }
    }
}
