const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

export function human_time_long(time: number) {
    let seconds = Math.floor(time % MINUTE).toString();
    let minutes = Math.floor((time % HOUR) / MINUTE).toString();
    let hours = Math.floor((time % DAY) / HOUR).toString();
    let days = Math.floor((time % YEAR) / DAY).toString();
    let years = Math.floor(time / YEAR).toString();
    return `${years}&nbsp;years<br>${days}&nbsp;days<br>${hours}&nbsp;hours<br>${minutes}&nbsp;minutes<br>${seconds}&nbsp;seconds`;
}

export function human_time_short(time: number) {
    let seconds = Math.floor(time % MINUTE).toString();
    let minutes = Math.floor((time % HOUR) / MINUTE).toString();
    let hours = Math.floor((time % DAY) / HOUR).toString();
    let days = Math.floor((time % YEAR) / DAY).toString();
    let years = Math.floor(time / YEAR).toString();
    return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
