export interface GeneratorConfig {
    Kind: "click" | "auto";
    BaseIncome: number;
    StartingCost: number;
    GrowthFactor: number;
}

export const GENERATORS: Array<GeneratorConfig> = [
    {
        Kind: "click",
        BaseIncome: 1,
        StartingCost: 4,
        GrowthFactor: 1.07,
    },
    {
        Kind: "auto",
        BaseIncome: 3,
        StartingCost: 11,
        GrowthFactor: 1.12,
    },
    {
        Kind: "auto",
        BaseIncome: 53,
        StartingCost: 380,
        GrowthFactor: 1.15,
    },
    {
        Kind: "auto",
        BaseIncome: 887,
        StartingCost: 13305,
        GrowthFactor: 1.11,
    },
    {
        Kind: "auto",
        BaseIncome: 3539,
        StartingCost: 70780,
        GrowthFactor: 1.14,
    },
    {
        Kind: "auto",
        BaseIncome: 86369,
        StartingCost: 4318450,
        GrowthFactor: 1.13,
    },
];
