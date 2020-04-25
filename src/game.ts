import {GL_CULL_FACE, GL_DEPTH_TEST} from "../common/webgl.js";
import {mat_diffuse_gouraud} from "../materials/mat_diffuse_gouraud.js";
import {mesh_cube} from "../meshes/cube.js";
import {Camera} from "./components/com_camera.js";
import {GENERATORS} from "./config.js";
import {GeneratorState} from "./generator.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_earn} from "./systems/sys_earn.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_time_control} from "./systems/sys_time_control.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_ui} from "./systems/sys_ui.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    Rewinding = false;
    TimeStart = Date.UTC(-10000, 0, 1, 0, 0, 0);
    TimeGoal = Date.now() + 1000;
    TimeEarned = 0;
    Generators: Array<GeneratorState> = [
        {
            Config: GENERATORS[0],
            Count: 1,
            Unlocked: true,
        },
        {
            Config: GENERATORS[1],
            Count: 0,
            Unlocked: true,
        },
        {
            Config: GENERATORS[2],
            Count: 0,
            Unlocked: false,
        },
        {
            Config: GENERATORS[3],
            Count: 0,
            Unlocked: false,
        },
        {
            Config: GENERATORS[4],
            Count: 0,
            Unlocked: false,
        },
        {
            Config: GENERATORS[5],
            Count: 0,
            Unlocked: false,
        },
    ];

    World = new World();

    ViewportWidth = 0;
    ViewportHeight = 0;
    ViewportResized = false;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    UI = document.querySelector("main")!;

    Canvas = document.querySelector("canvas")!;
    GL = this.Canvas.getContext("webgl")!;

    MaterialDiffuseGouraud = mat_diffuse_gouraud(this.GL);
    MeshCube = mesh_cube(this.GL);

    Camera?: Camera;
    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);

    constructor() {
        window.addEventListener("keydown", (evt) => {
            if (!evt.repeat) {
                this.InputState[evt.key] = 1;
                this.InputDelta[evt.key] = 1;
            }
        });
        window.addEventListener("keyup", (evt) => {
            this.InputState[evt.key] = 0;
            this.InputDelta[evt.key] = -1;
        });
        this.UI.addEventListener("mousedown", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 1;
            this.InputDelta[`Mouse${evt.button}`] = 1;
        });
        this.UI.addEventListener("mouseup", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 0;
            this.InputDelta[`Mouse${evt.button}`] = -1;
        });
        this.UI.addEventListener("mousemove", (evt) => {
            this.InputState.MouseX = evt.offsetX;
            this.InputState.MouseY = evt.offsetY;
            this.InputDelta.MouseX = evt.movementX;
            this.InputDelta.MouseY = evt.movementY;
        });
        this.UI.addEventListener("wheel", (evt) => {
            this.InputDelta.WheelY = evt.deltaY;
        });
        this.UI.addEventListener("contextmenu", (evt) => evt.preventDefault());

        this.GL.enable(GL_DEPTH_TEST);
        this.GL.enable(GL_CULL_FACE);
    }

    FrameReset() {
        // Reset event flags for the next frame.
        this.ViewportResized = false;
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();
        sys_time_control(this, delta);
        sys_transform(this, delta);
        sys_camera(this, delta);
        sys_light(this, delta);
        sys_render(this, delta);
        sys_earn(this, delta);
        sys_ui(this, delta);

        sys_framerate(this, delta, performance.now() - now);
    }
}
