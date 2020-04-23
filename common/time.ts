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
