import { Either, left, right } from './Either'

/**
 * Error handling to implanted for verify
 * if sum of tow params is equal to the third
 * params
 * @param x {number}
 * @param y {number}
 * @param z {number}
 */
function correctTheSumValue(
  x: number,
  y: number,
  z: number,
): Either<string, string> {
  const some = x + y

  if (some === z) {
    return right('success')
  }
  return left('error')
}

describe('Error handling', () => {
  test('success result', () => {
    const result = correctTheSumValue(2, 2, 4)

    expect(result.isRight()).toEqual(true)
  })

  test('error result', () => {
    const result = correctTheSumValue(2, 2, 5)

    expect(result.isLeft()).toEqual(true)
  })
})
