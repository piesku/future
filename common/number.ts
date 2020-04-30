export function lerp(from: number, to: number, progress: number) {
    return from + progress * (to - from);
}

export const integer_f = new Intl.NumberFormat("en-US", {maximumFractionDigits: 0});
export const decimal_f = new Intl.NumberFormat("en-US", {maximumFractionDigits: 2});
export const percent_f = new Intl.NumberFormat("en-US", {style: "percent"});
