import { Module } from '@nestjs/common'
import { Encrypter } from './contracts/encrypter'
import { JwtEncrypter } from './implementations/jwtEncrypter'
import { HashComparer } from './contracts/hashComparer'
import { BcryptHasher } from './implementations/bcryptHasher'
import { HashGenerator } from './contracts/hashGenerator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
