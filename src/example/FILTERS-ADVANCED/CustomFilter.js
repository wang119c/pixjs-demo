import * as PIXI from 'pixi.js'
import bg_grass from '../../asset/bg_grass.jpg'
const app = new PIXI.Application()
document.body.appendChild(app.view)

// Create background image
const background = PIXI.Sprite.from(bg_grass)
background.width = app.screen.width
background.height = app.screen.height
app.stage.addChild(background)

app.stop()

const shader2 = `
precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform float customUniform;

void main(void)
{
   vec2 uvs = vTextureCoord.xy;

   vec4 fg = texture2D(uSampler, vTextureCoord);


   fg.r = uvs.y + sin(customUniform);

   //fg.r = clamp(fg.r,0.0,0.9);

   gl_FragColor = fg;

}
`

app.loader.add('shader', shader2).load(onLoaded)

let filter
function onLoaded (loader, res) {
  filter = new PIXI.Filter(null, res.shader.data, {
    customUniform: 0.0
  })
  background.filters = [filter]
  app.start()
}

app.ticker.add((delta) => {
  filter.uniforms.customUniform += 0.04 * delta
})
