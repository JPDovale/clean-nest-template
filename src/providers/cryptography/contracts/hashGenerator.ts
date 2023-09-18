export abstract class HashGenerator {
  /**
   *
   * @param plain: expect any string to make hash
   * @returns one string hashed with hash salt in numbers of end
   */
  abstract hash(plain: string): Promise<string>
}
