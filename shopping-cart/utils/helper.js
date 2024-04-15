const dollarValue = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

export function dollarFormat(price) {
  return dollarValue.format(price)
}
