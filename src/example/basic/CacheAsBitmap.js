import * as PIXI from 'pixi.js'

import monsters from '../../asset/spritesheet/monsters.json'
import eggHead from '../../asset/eggHead.png'
import flowerTop from '../../asset/flowerTop.png'
import helmlok from '../../asset/helmlok.png'
import skully from '../../asset/skully.png'
const app = new PIXI.Application()
document.body.appendChild(app.view)

app.stop()

// load responses
app.loader
  .add('spritesheet', monsters)
  .load(onAssetsLoaded)

// holder to store alients
const alienFrames = [
  eggHead,
  flowerTop,
  helmlok,
  skully
]

const aliens = []
// create an empty container
const alienContainer = new PIXI.Container()
alienContainer.x = 400
alienContainer.y = 300

app.stage.interactive = true
app.stage.addChild(alienContainer)

function onAssetsLoaded () {
  // add a bunch of alients with textures from image paths
  for (let i = 0; i < 100; i++) {
    const frameName = alienFrames[i % 4]
    // create an alient using the frame name
    const alien = PIXI.Sprite.from(frameName)
    alien.tint = Math.random() * 0xFFFFFF

    // another way of doing the above would be
    // var texture = PIXI.Textture.from(frameName)
    // var alien = new PIXI.Sprite(Texture)

    alien.x = Math.random() * 800 - 400
    alien.y = Math.random() * 600 - 300

    alien.anchor.x = 0.5
    alien.anchor.y = 0.5

    aliens.push(alien)
    alienContainer.addChild(alien)
  }
  app.start()
}

// combines both mouse click + touch  tap
app.stage.on('pointertap', onClick)

function onClick () {
  alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap
}

let count = 0
app.ticker.add(() => {
  // let's rotate the aliens a little bit
  for (let i = 0; i < 100; i++) {
    const alien = aliens[i]
    alien.rotation += 0.1
  }
  count += 0.001

  alienContainer.scale.x = Math.sin(count)
  alienContainer.scale.y = Math.sin(count)

  alienContainer.rotation += 0.01
})
