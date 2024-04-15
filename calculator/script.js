document.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return
  getButtonType(e.target)
})

function getButtonType(type) {
  if (type.matches('[data-number]')) {
    displayNumber(type.innerText)
  } else if (type.matches('[data-operation]')) {
    displayOperand(type.innerText)
  } else if (type.matches('[data-equals]')) {
    displayOperand(false)
  } else if (type.matches('[data-delete]')) {
    removeNumber()
  } else if (type.matches('[data-all-clear]')) {
    clearCalc()
  }
}

function clearCalc() {
  document.querySelector('[data-operation]').innerText = ''
  document.querySelector('[data-primary-operand]').innerText = ''
  document.querySelector('[data-secondary-operand]').innerText = ''
}

function removeNumber() {
  const currentData = document.querySelector('[data-primary-operand]').innerText
  document.querySelector('[data-primary-operand]').innerText =
    currentData.slice(0, -1)
}

function displayNumber(value) {
  const currentData = document.querySelector('[data-primary-operand]').innerText
  document.querySelector('[data-primary-operand]').innerText =
    currentData + value
}

function displayOperand(value) {
  if (value === false) {
    const secondaryOperand = document.querySelector(
      '[data-secondary-operand]'
    ).innerText
    if (secondaryOperand) {
      const initialValue = parseInt(
        document.querySelector('[data-operation]').innerText
      )
      const currentValue = parseInt(
        document.querySelector('[data-primary-operand]').innerText
      )
      const operand = document.querySelector(
        '[data-secondary-operand]'
      ).innerText

      const returned = doMath(initialValue, currentValue, operand)
      document.querySelector('[data-operation]').innerText = ''
      document.querySelector('[data-primary-operand]').innerText = returned
      document.querySelector('[data-secondary-operand]').innerText = ''
    }
  } else {
    const secondaryOperand = document.querySelector(
      '[data-secondary-operand]'
    ).innerText
    if (secondaryOperand) {
      const initialValue = parseInt(
        document.querySelector('[data-operation]').innerText
      )
      const currentValue = parseInt(
        document.querySelector('[data-primary-operand]').innerText
      )
      const operand = document.querySelector(
        '[data-secondary-operand]'
      ).innerText

      const returned = doMath(initialValue, currentValue, operand)
      document.querySelector('[data-operation]').innerText = returned
      document.querySelector('[data-primary-operand]').innerText = ''
      document.querySelector('[data-secondary-operand]').innerText = value
    } else {
      document.querySelector('[data-secondary-operand]').innerText = value
      document.querySelector('[data-operation]').innerText =
        document.querySelector('[data-primary-operand]').innerText
      document.querySelector('[data-primary-operand]').innerText = ''
    }
  }
}

function doMath(one, two, operand) {
  if (operand.indexOf('+') !== -1) {
    return one + two
  } else if (operand.indexOf('-') !== -1) {
    return one - two
  } else if (operand.indexOf('*') !== -1) {
    return one * two
  } else if (operand.indexOf('÷') !== -1) {
    return one / two
  }
}
