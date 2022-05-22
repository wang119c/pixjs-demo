import * as PIXI from 'pixi.js'

import flag1 from '../../asset/pixi-filters/flag.png'
import displacement_map_repeat from '../../asset/pixi-filters/displacement_map_repeat.jpg'

const app = new PIXI.Application()
document.body.appendChild(app.view)

app.stage.interactive = true

const container = new PIXI.Container()
app.stage.addChild(container)

const flag = PIXI.Sprite.from(flag1)
container.addChild(flag)
flag.x = 100
flag.y = 100

const displacementSprite = PIXI.Sprite.from(displacement_map_repeat)
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
displacementFilter.padding = 10

displacementSprite.position = flag.position

app.stage.addChild(displacementSprite)

flag.filters = [displacementFilter]

displacementFilter.scale.x = 30
displacementFilter.scale.y = 60

app.ticker.add(() => {
  displacementSprite.x++
  if (displacementSprite.x > displacementSprite.width) {
    displacementSprite.x = 0
  }
})
