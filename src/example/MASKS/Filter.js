import * as PIXI from 'pixi.js'
import bg_grass from '../../asset/bg_grass.jpg'

const app = new PIXI.Application()
document.body.appendChild(app.view)

const redius = 100
const blurSize = 32
app.loader.add('grass', bg_grass)
app.loader.load(setup)

function setup (loader, resources) {
  const background = new PIXI.Sprite(resources.grass.texture)
  app.stage.addChild(background)

  const circle = new PIXI.Graphics().beginFill(0xFF0000).drawCircle(redius + blurSize, redius + blurSize, redius + blurSize).endFill()
  circle.filters = [new PIXI.filters.BlurFilter(blurSize)]

  const bounds = new PIXI.Rectangle(0, 0, (redius + blurSize) * 2, (redius + blurSize) * 2)
  const texture = app.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds)
  const focus = new PIXI.Sprite(texture)

  app.stage.addChild(focus)
  background.mask = focus

  app.stage.interactive = true
  app.stage.on('mousemove', pointerMove)

  function pointerMove (event) {
    focus.position.x = event.data.global.x - focus.width / 2
    focus.position.y = event.data.global.y - focus.height / 2
  }
}
