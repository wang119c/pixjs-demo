import * as PIXI from 'pixi.js'
import bgGrass from '../../asset/bg_grass.jpg'
const app = new PIXI.Application({
  width: 500, height: 500, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
})
document.body.appendChild(app.view)
app.loader
  .add('bg_grass', bgGrass)
  .load(build)

function build () {
  const texture = app.loader.resources.bg_grass.texture
  const verticesX = 10
  const verticesY = 10
  const plane = new PIXI.SimplePlane(texture, verticesX, verticesY)
  plane.width = 200
  plane.height = 200
  plane.x = 100
  plane.y = 100
  app.stage.addChild(plane)

  const buffer = plane.geometry.getBuffer('aVertexPosition')

  app.ticker.add(() => {
    for (let i = 0; i < buffer.data.length; i++) {
      buffer.data[i] += (Math.random() - 0.5)
    }
    buffer.update()
  })
}
