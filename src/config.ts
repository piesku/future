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
        BaseIncome: 1,
        StartingCost: 4,
        GrowthFactor: 1.09,
    },
    {
        Kind: "auto",
        BaseIncome: 15,
        StartingCost: 45,
        GrowthFactor: 1.15,
    },
    {
        Kind: "auto",
        BaseIncome: 100,
        StartingCost: 1500,
        GrowthFactor: 1.07,
    },
    {
        Kind: "auto",
        BaseIncome: 3500,
        StartingCost: 70000,
        GrowthFactor: 1.7,
    },
    {
        Kind: "auto",
        BaseIncome: 50000,
        StartingCost: 5000000,
        GrowthFactor: 1.9,
    },
];
