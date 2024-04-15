import { randomGenerator } from './utils.js'

export class colorPicker {
  constructor(format, difficulty) {
    ;(this.format = format), (this.difficulty = difficulty)
  }

  hasFormat() {
    return this.#getFormat()
  }
  hasDifficulty() {
    return this.difficulty.value
  }
  #getFormat() {
    return randomGenerator(this.format.value)
  }
}
