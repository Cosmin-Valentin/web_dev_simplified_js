import { parse } from './parse.js'

describe('#parse', () => {
  test('test parenthesis', () => {
    expect(parse('(2 + 1) / 3')).toBe(1)
  })

  test('test exponent', () => {
    expect(parse('2 ^ 3')).toBe(8)
  })

  test('test multiply and devide', () => {
    expect(parse('3 * 4 / 2')).toBe(6)
  })

  test('test add and subtract', () => {
    expect(parse('2 - 1 + 3')).toBe(4)
  })

  //   test('test return float', () => {
  //     expect(parse('2')).toBe(2)
  //   })
})
