const enum Component {
    Camera,
    Render,
    Transform,
    TimeControl,
}

export const enum Has {
    Camera = 1 << Component.Camera,
    Render = 1 << Component.Render,
    Transform = 1 << Component.Transform,
    TimeControl = 1 << Component.TimeControl,
}
