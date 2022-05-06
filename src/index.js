// import _ from 'lodash'
import './asset/style.css'

// import printMe from './print.js'
import { cube } from './math.js'

// function component () {
//   var element = document.createElement('div')
//   var btn = document.createElement('button')
//   // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
//   element.innerHTML = _.join(['Hello1111', 'webpack11111'], ' ')
//   element.classList.add('hello')

//   btn.innerHTML = 'Click me and check the console111'
//   btn.onclick = printMe
//   element.appendChild(btn)

//   return element
// }

function component () {
  var element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack1',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
  return element
}

document.body.appendChild(component())
