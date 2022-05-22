import * as PIXI from 'pixi.js'

import bg_grass from '../../asset/bg_grass.jpg'
const app = new PIXI.Application()
document.body.appendChild(app.view)

const background = PIXI.Sprite.from(bg_grass)
background.width = app.screen.width
background.height = app.screen.height
app.stage.addChild(background)

const shaderFrag = `
precision highp float;

varying vec2 vTextureCoord;

uniform vec2 mouse;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform float time;

void main() {
  vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
  if (length(mouse - screenPos) < 25.0) {
      gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
  } else {
      gl_FragColor = vec4( sin(time), (mouse.xy - outputFrame.xy) / outputFrame.zw, 1.0) * 0.5; // blend with underlying image, alpha=0.5
  }
}
`

const container = new PIXI.Container()
container.filterArea = new PIXI.Rectangle(100, 100, app.screen.width - 200, app.screen.height - 200)
app.stage.addChild(container)

const filter = new PIXI.Filter(null, shaderFrag, {
  mouse: new PIXI.Point()
})

container.filters = [filter]

app.ticker.add((delta) => {
  filter.uniforms.mouse.copyFrom(app.renderer.plugins.interaction.mouse.global)
})
