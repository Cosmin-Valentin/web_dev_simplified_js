import Game from './utils/Game.js'
import Interaction from './utils/Interaction.js'

const board = document.querySelector('.board')
const subtext = document.querySelector('.subtext')
const BOARD_SIZE = 10

const game = new Game(board, BOARD_SIZE)
game.generateBoard()
const ui = new Interaction(board, BOARD_SIZE)
ui.addEvents()
