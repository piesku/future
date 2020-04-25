import {Material, Mesh} from "../../common/material.js";
import {GL_CW} from "../../common/webgl.js";
import {TexturedLayout} from "../../materials/layout_textured.js";
import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";
import {RenderKind} from "./com_render.js";

export interface RenderTextured {
    readonly Kind: RenderKind.Textured;
    readonly Material: Material<TexturedLayout>;
    readonly Mesh: Mesh;
    readonly FrontFace: GLenum;
    readonly VAO: WebGLVertexArrayObject;
    Texture: WebGLTexture;
}

let vaos: WeakMap<Mesh, WebGLVertexArrayObject> = new WeakMap();

export function render_textured(
    material: Material<TexturedLayout>,
    mesh: Mesh,
    texture: WebGLTexture
) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Render;
        game.World.Render[entity] = {
            Kind: RenderKind.Textured,
            Material: material,
            Mesh: mesh,
            FrontFace: GL_CW,
            VAO: vaos.get(mesh)!,
            Texture: texture,
        };
    };
}
