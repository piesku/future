export interface GeneratorState {
    id: number;
    count: number;
    unlocked: boolean;
}

export function init_generators(): Array<GeneratorState> {
    return [
        {
            id: 0,
            count: 1,
            unlocked: true,
        },
        {
            id: 1,
            count: 0,
            unlocked: true,
        },
        {
            id: 2,
            count: 0,
            unlocked: false,
        },
        {
            id: 3,
            count: 0,
            unlocked: false,
        },
        {
            id: 4,
            count: 0,
            unlocked: false,
        },
        {
            id: 5,
            count: 0,
            unlocked: false,
        },
    ];
}
