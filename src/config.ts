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
        StartingCost: 40,
        GrowthFactor: 1.09,
    },
    {
        Kind: "auto",
        BaseIncome: 53,
        StartingCost: 1500,
        GrowthFactor: 1.12,
    },
    {
        Kind: "auto",
        BaseIncome: 887,
        StartingCost: 44350,
        GrowthFactor: 1.09,
    },
    {
        Kind: "auto",
        BaseIncome: 3539,
        StartingCost: 353900,
        GrowthFactor: 1.11,
    },
    {
        Kind: "auto",
        BaseIncome: 21371,
        StartingCost: 4274200,
        GrowthFactor: 1.1,
    },
];
