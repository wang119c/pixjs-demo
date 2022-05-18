import * as PIXI from 'pixi.js'
import bunny from '../../asset/bunny.png'

const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
const sprite = PIXI.Sprite.from(bunny)

sprite.anchor.set(0.5)
sprite.x = app.screen.width / 2
sprite.y = app.screen.height / 2

sprite.interactive = true
sprite.buttonMode = true

sprite.on('pointerdown', onClick)

app.stage.addChild(sprite)

function onClick () {
  sprite.scale.x += 1.25
  sprite.scale.y += 1.25
}
