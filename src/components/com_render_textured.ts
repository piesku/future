import {Material, Mesh} from "../../common/material.js";
import {GL_ARRAY_BUFFER, GL_CW, GL_ELEMENT_ARRAY_BUFFER, GL_FLOAT} from "../../common/webgl.js";
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
        if (!vaos.has(mesh)) {
            // We only need to create the VAO once.
            let vao = game.ExtVao.createVertexArrayOES()!;
            game.ExtVao.bindVertexArrayOES(vao);

            game.GL.bindBuffer(GL_ARRAY_BUFFER, mesh.VertexBuffer);
            game.GL.enableVertexAttribArray(material.Locations.VertexPosition);
            game.GL.vertexAttribPointer(
                material.Locations.VertexPosition,
                3,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.GL.bindBuffer(GL_ARRAY_BUFFER, mesh.TexCoordBuffer);
            game.GL.enableVertexAttribArray(material.Locations.VertexTexCoord);
            game.GL.vertexAttribPointer(
                material.Locations.VertexTexCoord,
                2,
                GL_FLOAT,
                false,
                0,
                0
            );

            game.GL.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.IndexBuffer);

            game.ExtVao.bindVertexArrayOES(null);
            vaos.set(mesh, vao);
        }

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
