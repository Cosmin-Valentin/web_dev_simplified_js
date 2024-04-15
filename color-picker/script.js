import { colorPicker } from './logic.js'
import { randomGenerator, formatColor } from './utils.js'

const form = document.querySelector('form')
const formatType = document.querySelector('.color-string')
const buttons = document.querySelectorAll('.color-grid>button')
const answer = document.querySelector('.results>div')

userInterface()

function userInterface() {
  setRules()
  form.addEventListener('click', (e) => {
    if (!e.target.matches('input')) return

    setChecked(e.target)
    setRules()
    setButtons()
  })
  setButtons()

  const grid = document.querySelector('.color-grid')
  grid.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return

    if (e.target.dataset.isRight != null) {
      setButtons(true)
    } else {
      setButtons(false)
    }
  })

  const nexColor = document.querySelector('.results>button')
  nexColor.addEventListener('click', () => {
    setRules()
    setButtons()
  })
}

function setChecked(target) {
  const parent = target.parentElement
  parent.querySelector('input').checked = false
  target.checked = true
}

function setRules() {
  const game = new colorPicker(
    form.querySelector('input[name="format"]:checked'),
    form.querySelector('input[name="difficulty"]:checked')
  )
  const formatValue = game.hasFormat()
  const difficultyValue = game.hasDifficulty()
  setColors(
    form.querySelector('input[name="format"]:checked').value,
    formatValue,
    difficultyValue
  )
}

function setColors(type, value, difficulty) {
  switch (type) {
    case 'hsl':
      const [hue, saturation, lightness] = value
      const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      formatType.textContent = hslColor
      setWinningColor(hslColor)
      setRemainingColors(type, value, difficulty)
      break
    case 'rgb':
      const [red, blue, green] = value
      const rgbColor = `rgb(${red}, ${blue}, ${green})`
      formatType.textContent = rgbColor
      setWinningColor(rgbColor)
      setRemainingColors(type, value, difficulty)
      break
    default:
      formatType.textContent = value
      setRemainingColors(type, value, difficulty)
      setWinningColor(value)
  }
}

function setWinningColor(color) {
  buttons.forEach((button) => button.removeAttribute('data-is-right'))
  const button = document.querySelector(
    `.color-grid>button:nth-child(${randomGenerator()})`
  )
  button.style.backgroundColor = color
  button.dataset.isRight = true
}

function setRemainingColors(type, color, difficulty) {
  const buttons = document.querySelectorAll(
    '.color-grid>button:not([data-is-right])'
  )
  buttons.forEach((button) => {
    const thisColor = formatColor(type, color, difficulty)
    button.style.backgroundColor = thisColor
  })
}

function setButtons(win) {
  if (win == null) {
    buttons.forEach((button) => {
      button.classList.remove('wrong')
      button.disabled = false
      answer.textContent = ''
    })
  } else {
    buttons.forEach((button) => {
      if (!button.dataset.isRight) {
        button.classList.add('wrong')
      }
      button.disabled = true
      if (win) {
        answer.textContent = 'Correct'
      } else {
        answer.textContent = 'Wrong'
      }
    })
  }
}
