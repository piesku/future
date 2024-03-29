import {Quat, Vec3} from "../common/math.js";
import {GL_PIXEL_UNSIGNED_BYTE, GL_RGBA, GL_TEXTURE_2D} from "../common/webgl.js";
import {Has} from "./components/com_index.js";
import {transform} from "./components/com_transform.js";
import {Entity, Game} from "./game.js";
import {World} from "./world.js";

const MAX_ENTITIES = 10000;

let raf = 0;

export function loop_start(game: Game) {
    let last = performance.now();

    let tick = (now: number) => {
        let delta = (now - last) / 1000;
        game.FrameUpdate(delta);
        game.FrameReset();
        last = now;
        raf = requestAnimationFrame(tick);
    };

    loop_stop();
    tick(last);
}

export function loop_stop() {
    cancelAnimationFrame(raf);
}

export function create(world: World, mask: number = 0) {
    for (let i = 0; i < MAX_ENTITIES; i++) {
        if (!world.Mask[i]) {
            world.Mask[i] = mask;
            return i;
        }
    }
    throw new Error("No more entities available.");
}

type Mixin = (game: Game, entity: Entity) => void;
export interface Blueprint {
    Translation?: Vec3;
    Rotation?: Quat;
    Scale?: Vec3;
    Using?: Array<Mixin>;
    Children?: Array<Blueprint>;
}

export function instantiate(
    game: Game,
    {Translation, Rotation, Scale, Using = [], Children = []}: Blueprint
) {
    let entity = create(game.World);
    transform(Translation, Rotation, Scale)(game, entity);
    for (let mixin of Using) {
        mixin(game, entity);
    }
    let entity_transform = game.World.Transform[entity];
    for (let subtree of Children) {
        let child = instantiate(game, subtree);
        let child_transform = game.World.Transform[child];
        child_transform.Parent = entity_transform;
        entity_transform.Children.push(child_transform);
    }
    return entity;
}

export function destroy(world: World, entity: Entity) {
    let mask = world.Mask[entity];
    if (mask & Has.Transform) {
        for (let child of world.Transform[entity].Children) {
            destroy(world, child.EntityId);
        }
    }
    world.Mask[entity] = 0;
}

export function load_texture(game: Game, image: HTMLImageElement) {
    let gl = game.GL;
    let texture = gl.createTexture()!;
    gl.bindTexture(GL_TEXTURE_2D, texture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_PIXEL_UNSIGNED_BYTE, image);
    gl.generateMipmap(GL_TEXTURE_2D);

    return texture;
}
