import * as PIXI from 'pixi.js'

import bg_depth_blur from '../../asset/pixi-filters/bg_depth_blur.jpg'
import depth_blur_dudes from '../../asset/pixi-filters/depth_blur_dudes.jpg'
import depth_blur_moby from '../../asset/pixi-filters/depth_blur_moby.jpg'

const app = new PIXI.Application()
document.body.appendChild(app.view)
const bg = PIXI.Sprite.from(bg_depth_blur)
bg.width = app.screen.width
bg.height = app.screen.height
app.stage.addChild(bg)

const littleDudes = PIXI.Sprite.from(depth_blur_dudes)
littleDudes.x = app.screen.width / 2 - 315
littleDudes.y = 200
app.stage.addChild(littleDudes)

const littleRobot = PIXI.Sprite.from(depth_blur_moby)
littleRobot.x = (app.screen.width / 2) - 200
littleRobot.y = 100
app.stage.addChild(littleRobot)

const blurFilter1 = new PIXI.filters.BlurFilter()
const blurFilter2 = new PIXI.filters.BlurFilter()

littleDudes.filters = [blurFilter1]
littleDudes.filters = [blurFilter2]

let count = 0
app.ticker.add(() => {
  count += 0.005

  const blurAmount = Math.cos(count)
  const blurAmount2 = Math.sin(count)

  blurFilter1.blur = 20 * (blurAmount)
  blurFilter2.blur = 20 * (blurAmount2)
})

