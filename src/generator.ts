import {GeneratorConfig} from "./config";

export interface GeneratorState {
    Config: GeneratorConfig;
    Count: number;
    Unlocked: boolean;
}

export function total_cost(gen: GeneratorConfig, own_count: number, buy_count: number) {
    let factor = 0;
    for (let i = 0; i < buy_count; i++) {
        factor += gen.CostFactor ** i;
    }

    return gen.StartingCost * gen.CostFactor ** own_count * factor;
}

export function income(gen: GeneratorConfig, count: number) {
    let multiplier = mult_current(gen, count);
    return multiplier * gen.BaseIncome * count ** gen.IncomeFactor;
}

export function mult_current(gen: GeneratorConfig, count: number) {
    let multiplier = 1;
    for (let [threshold, mult] of gen.Multipliers) {
        if (count >= threshold) {
            multiplier *= mult;
        } else {
            break;
        }
    }
    return multiplier;
}

export function mult_progress(gen: GeneratorConfig, count: number) {
    let current = 0;
    for (let [threshold, mult] of gen.Multipliers) {
        if (count < threshold) {
            return {
                Value: count - current,
                Target: threshold - current,
                Multiplier: mult,
            };
        } else {
            current = threshold;
        }
    }
}
