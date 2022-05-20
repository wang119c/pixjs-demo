import * as PIXI from 'pixi.js'

import bgButton from '../../asset/bg_button.jpg'
import btn from '../../asset/button.png'
import btnDown from '../../asset/button_down.png'
import btnOver from '../../asset/button_over.png'

import bunny from '../../asset/bunny.png'
import bunnySaturated from '../../asset/bunny_saturated.png'

const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)

const defaultIcon = `url('${bunny}'),auto`
const hoverIcon = `url('${bunnySaturated}'),auto`

app.renderer.plugins.interaction.cursorStyles.default = defaultIcon
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon

const background = PIXI.Sprite.from(bgButton)
background.width = app.screen.width
background.height = app.screen.height

app.stage.addChild(background)

const textureButton = PIXI.Texture.from(btn)
const textureButtonDown = PIXI.Texture.from(btnDown)
const textureButtonOver = PIXI.Texture.from(btnOver)

const buttons = []
const buttonPositions = [
  175, 75,
  655, 75,
  410, 325,
  150, 465,
  685, 445
]

for (let i = 0; i < 5; i++) {
  const button = new PIXI.Sprite(textureButton)
  button.anchor.set(0.5)
  button.x = buttonPositions[i * 2]
  button.y = buttonPositions[i * 2 + 1]

  button.interactive = true
  button.buttonMode = true

  button
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut)

  app.stage.addChild(button)
  buttons.push(button)
}

buttons[0].scale.set(1.2)
buttons[2].rotation = Math.PI / 10
buttons[3].scale.set(0.8)
buttons[4].scale.set(0.8, 1.2)
buttons[4].rotation = Math.PI

function onButtonDown () {
  this.isdown = true
  this.texture = textureButtonDown
  this.alpha = 1
}

function onButtonUp () {
  this.isdown = false
  if (this.isOver) {
    this.texture = textureButtonOver
  } else {
    this.texture = textureButton
  }
}

function onButtonOver () {
  this.isOver = true
  if (this.isdown) {
    return
  }
  this.texture = textureButtonOver
}

function onButtonOut () {
  this.isOver = false
  if (this.isdown) {
    return
  }
  this.texture = textureButton
}