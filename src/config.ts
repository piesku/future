export interface Generator {
    BaseIncome: number;
    StartingCost: number;
    GrowthFactor: number;
}

export const CLICK_GENERATORS: Array<Generator> = [
    {
        BaseIncome: 1,
        StartingCost: 5,
        GrowthFactor: 1.01,
    },
];

export const AUTO_GENERATORS: Array<Generator> = [
    {
        BaseIncome: 60,
        StartingCost: 180,
        GrowthFactor: 1.09,
    },
    {
        BaseIncome: 3600,
        StartingCost: 18000,
        GrowthFactor: 1.1,
    },
    {
        BaseIncome: 86400,
        StartingCost: 864000,
        GrowthFactor: 1.11,
    },
    {
        BaseIncome: 604800,
        StartingCost: 6048000,
        GrowthFactor: 1.14,
    },
    {
        BaseIncome: 2592000,
        StartingCost: 25920000,
        GrowthFactor: 1.12,
    },
];
