export default function getMines(BOARD_SIZE) {
  const mineSet = new Set()

  while (mineSet.size < BOARD_SIZE) {
    mineSet.add(Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE)) + 1)
  }

  return [...mineSet]
}
