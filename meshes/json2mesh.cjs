#!/usr/bin/env node

const {readFileSync} = require("fs");

if (process.argv.length !== 3) {
    console.error("Provide a JOSN file on stdin and the name of the mesh:");
    console.error("  cat foo.json | node asset2mesh.cjs foo");
    process.exit(1);
}

process.stdin.resume();
let json = readFileSync(process.stdin.fd, "utf8");
process.stdin.pause();

let scene = JSON.parse(json);
let {vertices, normals, faces, texturecoords = [[]]} = scene.meshes[0];

console.log(`\
import {Mesh} from "../common/material.js";
import {GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_STATIC_DRAW} from "../common/webgl.js";

export function mesh_${process.argv[2]}(gl: WebGLRenderingContext): Mesh {
    let vertex_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
    gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);

    let normal_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, normal_buf);
    gl.bufferData(GL_ARRAY_BUFFER, normal_arr, GL_STATIC_DRAW);

    let texcoord_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ARRAY_BUFFER, texcoord_buf);
    gl.bufferData(GL_ARRAY_BUFFER, texcoord_arr, GL_STATIC_DRAW);

    let index_buf = gl.createBuffer()!;
    gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, index_buf);
    gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, index_arr, GL_STATIC_DRAW);

    return {
        VertexBuffer: vertex_buf,
        VertexArray: vertex_arr,
        NormalBuffer: normal_buf,
        TexCoordBuffer: texcoord_buf,
        IndexBuffer: index_buf,
        IndexArray: index_arr,
        IndexCount: index_arr.length,
    };
}

let vertex_arr = Float32Array.from([
    ${vertices.join(",\n    ")},
]);

let normal_arr = Float32Array.from([
    ${normals.join(",\n    ")},
]);
${
    texturecoords[0].length > 0
        ? `
let texcoord_arr = Float32Array.from([
    ${texturecoords[0].join(",\n    ")},
]);
`
        : `
let texcoord_arr = Float32Array.from([]);
`
}
let index_arr = Uint16Array.from([
    ${faces
        // Flatten faces into one big index array.
        .flat(1)
        // Both Blender and Assimp triangulate polygons starting from the first
        // vertex and going CCW tri-by-tri. The result is that adjacent tris
        // share their first vertex rather than the last which breaks flat
        // shading. In OpenGL, the provoking vertex of a primitive is by
        // default set to the last one. WebGL doesn't expose the
        // glProvokingVertex API to change the default. By reversing the index
        // array, the tri get drawn in reverse order and the shared vertices
        // become last.
        .reverse()
        .join(",\n    ")},
]);`);
