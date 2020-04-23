import {GeneratorState} from "./game";

export function total_cost(gen: GeneratorState, count: number) {
    let factor = 0;
    for (let i = 0; i < count; i++) {
        factor += gen.Config.GrowthFactor ** i;
    }

    return gen.Config.StartingCost * gen.Config.GrowthFactor ** gen.Count * factor;
}
