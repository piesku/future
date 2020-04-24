export interface GeneratorConfig {
    Kind: "click" | "auto";
    BaseIncome: number;
    StartingCost: number;
    GrowthFactor: number;
    Multipliers: Array<[number, number]>;
}

export const GENERATORS: Array<GeneratorConfig> = [
    {
        Kind: "click",
        BaseIncome: 1,
        StartingCost: 4,
        GrowthFactor: 1.07,
        Multipliers: [],
    },
    {
        Kind: "auto",
        BaseIncome: 3,
        StartingCost: 40,
        GrowthFactor: 1.09,
        Multipliers: [
            [10, 2],
            [25, 2],
            [50, 2.5],
            [75, 3],
            [100, 3],
            [150, 3],
            [200, 3],
            [250, 3],
            [500, 3],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 53,
        StartingCost: 1500,
        GrowthFactor: 1.12,
        Multipliers: [
            [10, 4],
            [25, 2],
            [50, 4],
            [75, 2],
            [100, 4],
            [150, 2],
            [200, 4],
            [250, 2],
            [500, 4],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 887,
        StartingCost: 44350,
        GrowthFactor: 1.09,
        Multipliers: [
            [10, 1.5],
            [25, 2],
            [50, 1.5],
            [75, 2],
            [100, 2],
            [150, 2],
            [200, 2],
            [250, 2],
            [500, 2],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 3539,
        StartingCost: 353900,
        GrowthFactor: 1.11,
        Multipliers: [
            [10, 1.5],
            [25, 1.4],
            [50, 1.3],
            [75, 1.2],
            [100, 1.1],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 21371,
        StartingCost: 4274200,
        GrowthFactor: 1.1,
        Multipliers: [],
    },
];
