import { getRandom } from './utils/helper.js'

const board = document.querySelector('.board')
const boardSize = 10

function generateGrid() {
  let x = 1
  let y = 1
  for (let i = 1; i <= boardSize * 10; i++) {
    if (x > 10) {
      x = 1
      y++
    }
    const div = document.createElement('div')
    div.className = 'tile'
    div.dataset.status = 'hidden'
    div.dataset.id = i
    div.dataset.x = x
    div.dataset.y = y
    board.appendChild(div)
    x++
  }

  setSideSize()
  setElements()
  addUserInteraction()
}

function setElements() {
  const minePlacement = getRandom(10, 100)
  minePlacement.forEach((tile) => {
    board.querySelector(`[data-id="${tile}"]`).dataset.mine = 1
  })
}

function openTiles(currentTile) {
  if (currentTile.dataset.status !== 'hidden') return

  if (parseInt(currentTile.dataset.mine) === 1) {
    endGame()
    return
  }

  currentTile.dataset.status = ''

  const adjacentTiles = nearbyTiles(
    parseFloat(currentTile.dataset.x),
    parseFloat(currentTile.dataset.y)
  )
  const adjacentMines = adjacentTiles.filter((t) => {
    return t.dataset.mine
  })
  if (adjacentMines.length > 0) {
    currentTile.textContent = adjacentMines.length
  } else {
    adjacentTiles.forEach((t) => {
      openTiles(t)
    })
  }
  checkIfGameOver()
}

function nearbyTiles(x, y) {
  const tiles = []
  for (let offSetX = -1; offSetX <= 1; offSetX++) {
    for (let offSetY = -1; offSetY <= 1; offSetY++) {
      const nearTile = board.querySelector(
        `[data-x="${x + offSetX}"][data-y="${y + offSetY}"]`
      )
      if (nearTile != null) tiles.push(nearTile)
    }
  }
  return tiles
}

function setSideSize() {
  board.style.setProperty('--size', boardSize)
}

function addUserInteraction() {
  board.addEventListener('contextmenu', rightClick)
  board.addEventListener('click', leftClick)
}

function rightClick(e) {
  e.preventDefault()
  if (!e.target.matches('.tile')) return

  if (e.target.dataset.status === 'hidden') {
    e.target.dataset.status = 'marked'
  } else if (e.target.dataset.status === 'marked') {
    e.target.dataset.status = 'hidden'
  }
  updateMinesLeft()
}

function leftClick(e) {
  if (!e.target.matches('.tile')) return
  openTiles(e.target)
}

function checkIfGameOver() {
  const hiddenTiles = board.querySelectorAll('[data-status="hidden"]').length
  const markedTiles = board.querySelectorAll('[data-status="marked"]').length
  if (hiddenTiles + markedTiles === 10) {
    displayModal(true)
  }
}

function endGame() {
  const minedTiles = board.querySelectorAll('[data-mine="1"]')
  minedTiles.forEach((mine) => (mine.dataset.status = 'mine'))

  document.removeEventListener('click', leftClick)
  document.removeEventListener('contextmenu', rightClick)

  displayModal()
}

function displayModal(win = false) {
  if (win) {
    document.querySelector('.modal h3').innerText = 'Congratulations!'
  }
  document.addEventListener('click', (e) => {
    if (!e.target.matches('.modal-button')) return

    location.reload()
  })
  document.querySelector('.modal').classList.add('open')
  document.querySelector('.overlay').classList.add('open')
}

function updateMinesLeft() {
  const markedTiles = board.querySelectorAll('[data-status="marked"]').length
  const minesLeft = 10 - markedTiles
  document.querySelector('.subtext').innerText = `Mines Left: ${minesLeft}`
}

generateGrid()
