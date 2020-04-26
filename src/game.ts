import {GL_CULL_FACE, GL_DEPTH_TEST} from "../common/webgl.js";
import {mat_diffuse_gouraud} from "../materials/mat_diffuse_gouraud.js";
import {mat_textured} from "../materials/mat_textured.js";
import {mesh_cube} from "../meshes/cube.js";
import {Camera} from "./components/com_camera.js";
import {GeneratorState} from "./generator.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_earn} from "./systems/sys_earn.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_render} from "./systems/sys_render.js";
import {sys_save} from "./systems/sys_save.js";
import {sys_switch_time_control} from "./systems/sys_switch_time_control.js";
import {sys_time_control} from "./systems/sys_time_control.js";
import {sys_transform} from "./systems/sys_transform.js";
import {sys_ui} from "./systems/sys_ui.js";
import {World} from "./world.js";

const SAVE_KEY = "com.piesku.future.save";

export type Entity = number;

export class Game {
    FirstRun = true;
    HasWon = false;
    Textures: {[key: string]: WebGLTexture} = {};

    Rewinding = false;
    TimeStart = Date.UTC(-9999, 0, 1, 0, 0, 0);
    TimeCurrent = Date.now();
    TimeGoal = Date.now() + 1000;
    TimeEarned = 0;
    TimeEarnedOffline = 0;
    Generators: Array<GeneratorState> = [
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

    World = new World();

    ViewportWidth = 0;
    ViewportHeight = 0;
    ViewportResized = false;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    UI = document.querySelector("main")!;
    // @ts-ignore
    Audio = new (window["AudioContext"] || window.webkitAudioContext)();

    Canvas = document.querySelector("canvas")!;
    GL = this.Canvas.getContext("webgl")!;

    MaterialTextured = mat_textured(this.GL);
    MaterialDiffuseGouraud = mat_diffuse_gouraud(this.GL);
    MeshCube = mesh_cube(this.GL);

    Camera?: Camera;
    // The rendering pipeline supports 8 lights.
    LightPositions = new Float32Array(4 * 8);
    LightDetails = new Float32Array(4 * 8);

    constructor() {
        this.UI.addEventListener("mousedown", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 1;
            this.InputDelta[`Mouse${evt.button}`] = 1;
        });
        this.UI.addEventListener("mouseup", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 0;
            this.InputDelta[`Mouse${evt.button}`] = -1;
        });

        let saved = localStorage.getItem(SAVE_KEY);
        if (saved) {
            let payload: SavedProgress = JSON.parse(saved);
            this.FirstRun = payload.firstRun;
            this.HasWon = payload.hasWon;
            this.TimeEarned = payload.timeEarned;
            this.Generators = payload.generators;

            // Scale the delta down with a sqrt.
            let delta_offline = (Date.now() - payload.timeSaved) / 1000;
            sys_earn(this, delta_offline ** 0.75);
            this.TimeEarnedOffline = this.TimeEarned - payload.timeEarned;
        }

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
        sys_switch_time_control(this, delta);
        sys_time_control(this, delta);
        sys_transform(this, delta);
        sys_camera(this, delta);
        sys_light(this, delta);
        sys_render(this, delta);
        sys_earn(this, delta);
        sys_save(this, delta);
        sys_ui(this, delta);

        sys_framerate(this, delta, performance.now() - now);
    }
}

interface SavedProgress {
    timeSaved: number;
    firstRun: boolean;
    hasWon: boolean;
    timeEarned: number;
    generators: Array<GeneratorState>;
}

export function game_save(game: Game) {
    let payload: SavedProgress = {
        timeSaved: Date.now(),
        firstRun: game.FirstRun,
        hasWon: game.HasWon,
        timeEarned: game.TimeEarned,
        generators: game.Generators,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
}
