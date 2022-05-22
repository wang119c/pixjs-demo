import * as PIXI from 'pixi.js'
import snake from '../../asset/snake.png'
const app = new PIXI.Application()
document.body.appendChild(app.view)

const ropeLength = 45
const points = []
for (let i = 0; i < 25; i++) {
  points.push(new PIXI.Point(i * ropeLength, 0))
}

const strip = new PIXI.SimpleRope(PIXI.Texture.from(snake), points)
strip.x = -40
strip.y = 300

app.stage.addChild(strip)

const g = new PIXI.Graphics()
g.x = strip.x
g.y = strip.y

app.stage.addChild(g)

let count = 0
app.ticker.add(() => {
  count += 0.1
  for (let i = 0; i < points.length; i++) {
    points[i].y = Math.sin((i * 0.5) + count) * 30
    points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20
  }
  renderPoints()
})

function renderPoints () {
  g.clear()
  g.lineStyle(2, 0xffc2c2)
  g.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    g.lineTo(points[i].x, points[i].y)
  }

  for (let i = 1; i < points.length; i++) {
    g.beginFill(0xff0022)
    g.drawCircle(points[i].x, points[i].y, 10)
    g.endFill()
  }
}
