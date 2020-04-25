const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365;

export function human_time(time: number) {
    return {
        Seconds: Math.floor(time % MINUTE),
        Minutes: Math.floor((time % HOUR) / MINUTE),
        Hours: Math.floor((time % DAY) / HOUR),
        Days: Math.floor((time % YEAR) / DAY),
        Years: Math.floor(time / YEAR),
    };
}

export function human_time_long(time: number) {
    let ht = human_time(time);
    return `
        years:&nbsp;${ht.Years}<br>
        days:&nbsp;${ht.Days}<br>
        hours:&nbsp;${ht.Hours}<br>
        minutes:&nbsp;${ht.Minutes}<br>
        seconds:&nbsp;${ht.Seconds}`;
}

export function human_time_short(time: number) {
    let ht = human_time(time);
    if (ht.Years > 0) return `${ht.Years}y${ht.Days}d`;
    if (ht.Days > 0) return `${ht.Days}y${ht.Hours}h`;
    if (ht.Hours > 0) return `${ht.Hours}h${ht.Minutes}m`;
    return `${ht.Minutes}m${ht.Seconds}s`;
}

export const year_f = new Intl.DateTimeFormat("en-US", {
    era: "short",
    year: "numeric",
});

export const day_f = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    weekday: "long",
});

export const time_f = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
});
