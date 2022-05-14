import * as PIXI from 'pixi.js'
import bgGrass from '../../asset/bg_grass.jpg'
import bgRotate from '../../asset/bg_rotate.jpg'

const app = new PIXI.Application()
document.body.appendChild(app.view)
const { stage } = app

const brush = new PIXI.Graphics()
brush.beginFill(0xffffff)
brush.drawRect(0, 0, 50)
brush.endFill()

app.loader.add('t1', bgGrass)
app.loader.add('t2', bgRotate)
app.loader.load(setup)

function setup (loader, resources) {
  const background = new PIXI.Sprite(resources.t1.texture)
  stage.addChild(background)
  background.width = app.screen.width
  background.height = app.screen.height

  const imageToReveal = new PIXI.Sprite(resources.t2.texture)
  stage.addChild(imageToReveal)
  imageToReveal.width = app.screen.width
  imageToReveal.height = app.screen.height

  const renderTexture = PIXI.RenderTexture.create(app.screen.width, app.screen.height)

  const renderTextureSprite = new PIXI.Sprite(renderTexture)
  stage.addChild(renderTextureSprite)
  imageToReveal.mask = renderTextureSprite

  app.stage.interactive = true
  app.stage.on('pointerdown', pointerDown)
  app.stage.on('pointerup', pointerUp)
  app.stage.on('pointermove', pointerMove)

  let dragging = false

  function pointerMove (event) {
    if (dragging) {
      brush.position.copyFrom(event.data.global)
      app.renderer.render(brush, {
        renderTexture: renderTexture,
        clear: false,
        transform: null,
        skipUpdateTransform: false
      })
    }
  }

  function pointerDown (event) {
    dragging = true
    pointerMove(event)
  }

  function pointerUp (event) {
    dragging = false
  }
}

