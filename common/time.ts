export function seconds_to_time(Seconds: number) {
    let hours = Math.floor(Seconds / 60 / 60);
    let minutes = Math.floor(Seconds / 60) - hours * 60;
    let seconds = Math.floor(Seconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function seconds_to_short_time(Seconds: number) {
    let hours = Math.floor(Seconds / 60 / 60);
    let minutes = Math.floor(Seconds / 60) - hours * 60;
    let seconds = Math.floor(Seconds % 60);
    return `${hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}${
        minutes > 0 ? minutes.toString().padStart(2, "0") + ":" : ""
    }${seconds.toString().padStart(2, "0")}`;
}

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

export function human_time_long(time: number) {
    let seconds = Math.floor(time % MINUTE)
        .toString()
        .padStart(2, "0");
    let minutes = Math.floor((time % HOUR) / MINUTE)
        .toString()
        .padStart(2, "0");
    let hours = Math.floor((time % DAY) / HOUR)
        .toString()
        .padStart(2, "0");
    let days = Math.floor((time % YEAR) / DAY)
        .toString()
        .padStart(3, "0");
    let years = Math.floor(time / YEAR).toString();
    return `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export function human_time_short(time: number) {
    let seconds = Math.floor(time % MINUTE).toString();
    let minutes = Math.floor((time % HOUR) / MINUTE).toString();
    let hours = Math.floor((time % DAY) / HOUR).toString();
    let days = Math.floor((time % YEAR) / DAY).toString();
    let years = Math.floor(time / YEAR).toString();
    return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
