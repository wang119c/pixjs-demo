import * as PIXI from 'pixi.js'
import bunny1 from '../../asset/bunny.png'
const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

const bunny = PIXI.Sprite.from(bunny1)
bunny.anchor.set(0.5)
bunny.x = app.view.width / 2
bunny.y = app.view.height / 2

app.stage.addChild(bunny)

app.ticker.add((delta) => {
  bunny.rotation += 0.1 * delta
})
