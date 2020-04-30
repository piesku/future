import {integer_f} from "../../common/number.js";
import {
    days_from,
    human_time,
    MAX_SECONDS,
    time_from,
    YEAR,
    years_from,
} from "../../common/time.js";
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
        let ht = human_time(game.TimeEarned);
        clock.innerHTML = `
            years:&nbsp;${integer_f.format(ht.Years)}<br>
            days:&nbsp;${ht.Days}<br>
            hours:&nbsp;${ht.Hours}<br>
            minutes:&nbsp;${ht.Minutes}<br>
            seconds:&nbsp;${ht.Seconds}`;
    }

    if (game.DateCurrent <= MAX_SECONDS) {
        let year = document.getElementById("clock-current-year");
        if (year) {
            year.textContent = years_from(game.DateCurrent);
        }
        let day = document.getElementById("clock-current-day");
        if (day) {
            day.textContent = days_from(game.DateCurrent);
        }
        let time = document.getElementById("clock-current-time");
        if (time) {
            time.textContent = time_from(game.DateCurrent);
        }
    } else {
        let year = document.getElementById("clock-current-year");
        if (year) {
            year.textContent = integer_f.format(game.DateCurrent / YEAR);
        }
    }

    {
        let year = document.getElementById("clock-future-year");
        if (year) {
            year.textContent = years_from(game.DateGoal);
        }
        let day = document.getElementById("clock-future-day");
        if (day) {
            day.textContent = days_from(game.DateGoal);
        }
        let time = document.getElementById("clock-future-time");
        if (time) {
            time.textContent = time_from(game.DateGoal);
        }
    }
}
