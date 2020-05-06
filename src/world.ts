import {Camera} from "./components/com_camera.js";
import {Render} from "./components/com_render.js";
import {TimeControl} from "./components/com_time_control.js";
import {Transform} from "./components/com_transform.js";

export class World {
    // Component flags
    Mask: Array<number> = [];
    // Component data
    Camera: Array<Camera> = [];
    Render: Array<Render> = [];
    Transform: Array<Transform> = [];
    TimeControl: Array<TimeControl> = [];
}
