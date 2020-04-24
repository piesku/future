import {GeneratorConfig} from "./config";

export interface GeneratorState {
    Config: GeneratorConfig;
    Count: number;
    Cost: number;
}

export function total_cost(gen: GeneratorConfig, own_count: number, buy_count: number) {
    let factor = 0;
    for (let i = 0; i < buy_count; i++) {
        factor += gen.GrowthFactor ** i;
    }

    return gen.StartingCost * gen.GrowthFactor ** own_count * factor;
}

export function income(gen: GeneratorConfig, count: number) {
    let multiplier = 1;
    for (let [threshold, mult] of gen.Multipliers) {
        if (count >= threshold) {
            multiplier *= mult;
        } else {
            break;
        }
    }
    return gen.BaseIncome * count * multiplier;
}
