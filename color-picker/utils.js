export function randomGenerator(format) {
  const array = []
  switch (format) {
    case 'rgb':
      for (let i = 0; i < 3; i++) {
        array.push(Math.floor(Math.random() * 255))
      }
      return array
    case 'hsl':
      array.push(Math.floor(Math.random() * 360))
      for (let i = 0; i < 2; i++) {
        array.push(Math.floor(Math.random() * 100))
      }
      return array
    case 'hex':
      const hexValues = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F'
      ]
      let hex = '#'
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * hexValues.length)
        hex += hexValues[index]
      }
      return hex
    default:
      return Math.floor(Math.random() * 6) + 1
  }
}

export function formatColor(type, value, difficulty) {
  if (difficulty === 'easy') {
    const color = setColorString(type, randomGenerator(type))
    return color
  } else if (difficulty === 'medium') {
    const color = setColorString(type, colorGenerator(type, value))
    return color
  } else {
    const color = setColorString(type, colorGenerator(type, value, true))
    return color
  }
}

function setColorString(type, value) {
  switch (type) {
    case 'hsl':
      const [hue, saturation, lightness] = value
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`
    case 'rgb':
      const [red, blue, green] = value
      return `rgb(${red}, ${blue}, ${green})`
    default:
      return value
  }
}

function colorGenerator(format, value, isHard = false) {
  const array = []
  switch (format) {
    case 'rgb':
      let rgbLimit
      value.forEach((color) => {
        if (color + 100 <= 255) {
          rgbLimit = color + 100
          if (isHard) rgbLimit = rgbLimit - 50
        } else {
          rgbLimit = color - 100
          if (isHard) rgbLimit = rgbLimit + 50
        }
        array.push(Math.floor(Math.random() * rgbLimit))
      })
      return array
    case 'hsl':
      const [hue, saturation, lightness] = value
      let hueLimit
      if (hue + 200 <= 360) {
        hueLimit = hue + 200
        if (isHard) hueLimit = hueLimit - 100
      } else {
        hueLimit = hue - 200
        if (isHard) hueLimit = hueLimit + 100
      }
      array.push(Math.floor(Math.random() * hueLimit))
      if (isHard) {
        array.push(saturation)
        array.push(lightness)
      } else {
        for (let i = 0; i < 2; i++) {
          array.push(Math.floor(Math.random() * 100))
        }
      }
      return array
    case 'hex':
      const hexValues = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F'
      ]
      let hex = '#'
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * hexValues.length)
        hex += hexValues[index]
      }
      return hex
  }
}
