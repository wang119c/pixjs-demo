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

app.loader.add('shader', '../../asset/pixi-filters/shader.frag').load(onLoaded)

let filter
function onLoaded (loader, res) {
  filter = new PIXI.Filter(null, res.shader.data, {
    customUniform: 0.0
  })
  background.filters = [filter]
  app.start()
  console.log('=======', loader, res)
}

app.ticker.add((delta) => {
  filter.uniforms.customUniform += 0.04 * delta
})
