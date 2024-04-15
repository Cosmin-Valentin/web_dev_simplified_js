export default class Interaction {
  constructor(board, BOARD_SIZE) {
    ;(this.board = board), (this.BOARD_SIZE = BOARD_SIZE)
  }

  addEvents() {
    this.board.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      if (e.target.dataset.status === 'hidden') {
        e.target.dataset.status = 'marked'
      } else if (e.target.dataset.status === 'marked') {
        e.target.dataset.status = 'hidden'
      }
    })

    this.board.addEventListener('click', (e) => {
      if (!e.target.matches('.tile')) return

      if (e.target.dataset.status === 'hidden') {
        this.#clearTile(e.target)
      } else return
    })
  }

  #clearTile(tile) {
    if (tile.dataset.status !== 'hidden') return
    tile.dataset.status = ''

    if (tile.dataset.mine) {
      tile.dataset.status = 'mine'
      this.#endGame()
      return
    }
    const adjacentTiles = this.#getTiles(tile)
    const mines = adjacentTiles.filter((nextTile) => nextTile.dataset.mine)
    if (mines.length === 0) {
      adjacentTiles.forEach((nextTile) => this.#clearTile(nextTile))
    } else {
      tile.textContent = mines.length
    }
  }

  #getTiles(tile) {
    const x = parseFloat(tile.dataset.x)
    const y = parseFloat(tile.dataset.y)
    const array = []
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const nextTile = document.querySelector(
          `[data-x="${x + offsetX}"][data-y="${y + offsetY}"]`
        )
        if (nextTile != null) {
          array.push(nextTile)
        }
      }
    }

    return array
  }

  #endGame() {
    const mines = this.board.querySelectorAll('[data-mine]')
    mines.forEach((mine) => (mine.dataset.status = 'mine'))
  }
}
