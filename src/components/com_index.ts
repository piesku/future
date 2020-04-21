const enum Component {
    Camera,
    Light,
    Render,
    Transform,
    TimeControl,
}

export const enum Has {
    Camera = 1 << Component.Camera,
    Light = 1 << Component.Light,
    Render = 1 << Component.Render,
    Transform = 1 << Component.Transform,
    TimeControl = 1 << Component.TimeControl,
}
