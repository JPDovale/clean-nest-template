export abstract class HashComparer {
  /**
   *
   * @param plain: This is plain string to compare whit hash
   * @param hash: This is hash previously generated
   */
  abstract compare(plain: string, hash: string): Promise<boolean>
}
