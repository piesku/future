import {GeneratorConfig} from "./config";

export interface GeneratorState {
    Config: GeneratorConfig;
    Count: number;
    Cost: number;
}

export function total_cost(gen: GeneratorState, count: number) {
    let factor = 0;
    for (let i = 0; i < count; i++) {
        factor += gen.Config.GrowthFactor ** i;
    }

    return gen.Config.StartingCost * gen.Config.GrowthFactor ** gen.Count * factor;
}

export function income(gen: GeneratorState, extra: number) {
    let total_count = gen.Count + extra;
    let multiplier = 1;
    for (let [count, mult] of gen.Config.Multipliers) {
        if (total_count >= count) {
            multiplier *= mult;
        } else {
            break;
        }
    }
    return gen.Config.BaseIncome * total_count * multiplier;
}
