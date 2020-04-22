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
        StartingCost: 5,
        GrowthFactor: 1.01,
    },
    {
        Kind: "auto",
        BaseIncome: 60,
        StartingCost: 180,
        GrowthFactor: 1.09,
    },
    {
        Kind: "auto",
        BaseIncome: 3600,
        StartingCost: 18000,
        GrowthFactor: 1.1,
    },
    {
        Kind: "auto",
        BaseIncome: 86400,
        StartingCost: 864000,
        GrowthFactor: 1.11,
    },
    {
        Kind: "auto",
        BaseIncome: 604800,
        StartingCost: 6048000,
        GrowthFactor: 1.14,
    },
    {
        Kind: "auto",
        BaseIncome: 2592000,
        StartingCost: 25920000,
        GrowthFactor: 1.12,
    },
];
