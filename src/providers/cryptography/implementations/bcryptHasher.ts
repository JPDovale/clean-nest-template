import { hash, compare } from 'bcryptjs'
import { HashComparer } from '../contracts/hashComparer'
import { HashGenerator } from '../contracts/hashGenerator'

export class BcryptHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    // take one random number between 8 and 32
    const handleHashSalt = Math.floor(Math.random() * (32 - 8 + 1)) + 8
    const handleHashSaltWithTowChar = String(handleHashSalt).padStart(2, '0')

    const plainHashed = await hash(plain, handleHashSalt)
    const encryptedPlainFinal = `${plainHashed}${handleHashSaltWithTowChar}`

    return encryptedPlainFinal
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
