import * as PIXI from 'pixi.js'
import bgRotate from '../../asset/bg_rotate.jpg'
import flowerTop from '../../asset/flowerTop.png'
const app = new PIXI.Application()
document.body.appendChild(app.view)

// create a new background sprite
const background = PIXI.Sprite.from(bgRotate)
background.width = app.screen.width
background.height = app.screen.height
app.stage.addChild(background)

// create an array to store a reference to the dudes
const dudeArray = []
const totalDudes = 20
for (let i = 0; i < totalDudes; i++) {
  const dude = PIXI.Sprite.from(flowerTop)
  dude.anchor.set(0.5)
  dude.scale.set(0.8 + Math.random() * 0.3)
  dude.x = Math.floor(Math.random() * app.screen.width)
  dude.y = Math.floor(Math.random() * app.screen.height)

  dude.blendMode = PIXI.BLEND_MODES.ADD
  dude.direction = Math.random() * Math.PI * 2
  dude.turningSpeed = Math.random() * 2
  dude.speed = 2 + Math.random() * 2
  dudeArray.push(dude)
  app.stage.addChild(dude)
}
const dudeBoundsPadding = 100
const dudeBounds = new PIXI.Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
)
app.ticker.add(() => {
  for (let i = 0; i < dudeArray.length; i++) {
    const dude = dudeArray[i]
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * dude.speed
    dude.y += Math.cos(dude.direction) * dude.speed
    dude.rotation = -dude.direction - Math.PI / 2

    // wrap the dudes by testing their bounds...
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width
    } else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width
    }

    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height
    } else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height
    }
  }
})

