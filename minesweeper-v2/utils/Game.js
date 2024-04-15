import getMines from './helper.js'

export default class Game {
  constructor(board, BOARD_SIZE) {
    ;(this.board = board), (this.BOARD_SIZE = BOARD_SIZE)
  }

  generateBoard() {
    this.board.style.setProperty('--size', this.BOARD_SIZE)
    let i = 1

    for (let x = 1; x <= this.BOARD_SIZE; x++) {
      for (let y = 1; y <= this.BOARD_SIZE; y++) {
        const tile = document.createElement('div')
        tile.classList = 'tile'
        tile.dataset.id = i
        i++
        tile.dataset.x = x
        tile.dataset.y = y
        tile.dataset.status = 'hidden'
        this.board.appendChild(tile)
      }
    }

    this.#placeMines()
  }

  #placeMines() {
    const mines = getMines(this.BOARD_SIZE)
    mines.forEach((mine) => {
      const tile = document.querySelector(`[data-id="${mine}"]`)
      tile.dataset.mine = true
    })
  }
}
