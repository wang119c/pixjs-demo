import * as PIXI from 'pixi.js'

const app = new PIXI.Application()
document.body.appendChild(app.view)
app.stop()

app.loader
  .add('spritesheet', '../../asset/spritesheet/0123456789.json')
  .load(onAssetsLoaded)

function onAssetsLoaded (loader, resources) {
  console.log(resources)
  const textures = []
  for (let i = 0; i < 10; i++) {
    const framekey = `0123456789 ${i}.ase`
    const texture = PIXI.Texture.from(framekey)
    const time = resources.spritesheet.data.frames[framekey].duration
    textures.push({ texture, time })
  }
  const scaling = 4
  const slow = new PIXI.AnimatedSprite(textures)
  slow.anchor.set(0.5)
  slow.scale.set(scaling)
  slow.animationSpeed = 0.5
  slow.x = (app.screen.width - slow.width) / 2
  slow.y = app.screen.height / 2
  slow.play()
  app.stage.addChild(slow)

  const fast = new PIXI.AnimatedSprite(textures)
  fast.anchor.set(0.5)
  fast.scale.set(scaling)
  fast.x = (app.screen.width + fast.width) / 2
  fast.y = app.screen.height / 2
  fast.play()
  app.stage.addChild(fast)

  app.start()
}
