import {Camera} from "./components/com_camera.js";
import {Light} from "./components/com_light.js";
import {Render} from "./components/com_render.js";
import {TimeControl} from "./components/com_time_control.js";
import {Transform} from "./components/com_transform.js";

export class World {
    // Component flags
    Mask: Array<number> = [];
    // Component data
    Camera: Array<Camera> = [];
    Light: Array<Light> = [];
    Render: Array<Render> = [];
    Transform: Array<Transform> = [];
    TimeControl: Array<TimeControl> = [];
}
