export function getRandom(required, max) {
  const array = new Set()

  while (array.size < required) {
    array.add(Math.floor(Math.random() * max) + 1)
  }

  return [...array]
}
