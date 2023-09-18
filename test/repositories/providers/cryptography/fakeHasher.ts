import { HashComparer } from '@providers/cryptography/contracts/hashComparer'
import { HashGenerator } from '@providers/cryptography/contracts/hashGenerator'

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
