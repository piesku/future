export interface GeneratorConfig {
    Kind: "click" | "auto";
    BaseIncome: number;
    IncomeFactor: number;
    StartingCost: number;
    CostFactor: number;
    Multipliers: Array<[number, number]>;
}

export const GENERATORS: Array<GeneratorConfig> = [
    {
        Kind: "click",
        BaseIncome: 1,
        IncomeFactor: 1.9,
        StartingCost: 4,
        CostFactor: 1.07,
        Multipliers: [],
    },
    {
        Kind: "auto",
        BaseIncome: 3,
        IncomeFactor: 1.1,
        StartingCost: 40,
        CostFactor: 1.12,
        Multipliers: [
            [10, 2],
            [25, 2],
            [50, 3],
            [75, 4],
            [100, 5],
            [150, 5],
            [200, 5],
            [250, 5],
            [500, 5],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 53,
        IncomeFactor: 1.2,
        StartingCost: 1500,
        CostFactor: 1.15,
        Multipliers: [
            [10, 4],
            [25, 2],
            [50, 3],
            [75, 4],
            [100, 5],
            [150, 5],
            [200, 5],
            [250, 5],
            [500, 5],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 887,
        IncomeFactor: 1.1,
        StartingCost: 44350,
        CostFactor: 1.11,
        Multipliers: [
            [10, 1.5],
            [25, 2],
            [50, 2.5],
            [75, 3],
            [100, 3.5],
            [150, 4],
            [200, 4.5],
            [250, 5],
            [500, 5.5],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 3539,
        IncomeFactor: 1.3,
        StartingCost: 707800,
        CostFactor: 1.14,
        Multipliers: [
            [10, 2.1],
            [25, 2.2],
            [50, 2.3],
            [75, 2.4],
            [100, 2.5],
            [150, 2.6],
            [200, 2.7],
            [250, 2.8],
            [500, 2.9],
        ],
    },
    {
        Kind: "auto",
        BaseIncome: 21371,
        IncomeFactor: 1.5,
        StartingCost: 10685500,
        CostFactor: 1.13,
        Multipliers: [
            [10, 1.1],
            [25, 1.2],
            [50, 1.3],
            [75, 1.4],
            [100, 1.5],
            [150, 1.6],
            [200, 1.7],
            [250, 1.8],
            [500, 1.9],
        ],
    },
];
