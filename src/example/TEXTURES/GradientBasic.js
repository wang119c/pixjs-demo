import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ antialias: true })
document.body.appendChild(app.view)

function createGradTexture () {
  const quality = 256
  const canvas = document.createElement('canvas')
  canvas.width = quality
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  const grd = ctx.createLinearGradient(0, 0, quality, 0)
  grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)')
  grd.addColorStop(0.3, 'cyan')
  grd.addColorStop(0.7, 'red')
  grd.addColorStop(1, 'green')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, quality, 1)

  return PIXI.Texture.from(canvas)
}

const gradTexture = createGradTexture()

const sprite = new PIXI.Sprite(gradTexture)
sprite.position.set(100, 100)
sprite.rotation = Math.PI / 8
sprite.width = 500
sprite.height = 50
app.stage.addChild(sprite)
