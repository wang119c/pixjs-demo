import * as PIXI from 'pixi.js'
import bg_scene_rotate from '../../asset/bg_scene_rotate.jpg'
import bg_rotate from '../../asset/bg_rotate.jpg'
import bg_displacement from '../../asset/bg_displacement.jpg'

const app = new PIXI.Application()
document.body.appendChild(app.view)

const geometry = new PIXI.Geometry()
  .addAttribute('aVertexPosition', // the attribute name
    [-100, -100, // x, y
      100, -100, // x, y
      100, 100], // x, y
    2) // the size of the attribute

  .addAttribute('aUvs', // the attribute name
    [0, 0, // u, v
      1, 0, // u, v
      1, 1], // u, v
    2) // the size of the attribute

const program = PIXI.Program.from(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

`precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSamplerTexture;

    void main() {

        gl_FragColor = texture2D(uSamplerTexture, vUvs);
    }

`)

const triangle = new PIXI.Mesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture: PIXI.Texture.from(bg_scene_rotate)
}))

const triangle2 = new PIXI.Mesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture: PIXI.Texture.from(bg_rotate)
}))

const triangle3 = new PIXI.Mesh(geometry, new PIXI.Shader(program, {
  uSamplerTexture: PIXI.Texture.from(bg_displacement)
}))

triangle.position.set(400, 300)
triangle.scale.set(2)

triangle2.position.set(200, 100)

triangle3.position.set(500, 400)
triangle3.scale.set(3)

app.stage.addChild(triangle3, triangle2, triangle)

app.ticker.add((delta) => {
  triangle.rotation += 0.01
  triangle2.rotation -= 0.01
  triangle3.rotation -= 0.005
})