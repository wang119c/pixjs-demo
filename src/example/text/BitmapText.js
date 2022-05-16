import * as PIXI from 'pixi.js'

import desyrel from '../../asset/bitmap-font/desyrel.xml'
const app = new PIXI.Application({ backgroundColor: 0x1099bb })
document.body.appendChild(app.view)
app.loader
  .add('desyrel', desyrel)
  .load(onAssetsLoaded)
function onAssetsLoaded () {
  const bitmapFontText = new PIXI.BitmapFont('bitmap fonts are support! \nWoo yay!', { fontName: 'Desyrel', fontSize: 55, align: 'left' })
  bitmapFontText.x = 50
  bitmapFontText.y = 200
  app.stage.addChild(bitmapFontText)
}
