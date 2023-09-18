import { Real } from '@modules/real/models/Real'
import { RealsRepository } from '@modules/real/repositories/realsRepository'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '@providers/cryptography/contracts/encrypter'
import { Either, left, right } from '@shared/core/error/Either'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'

interface Request {
  name: string
  information: string
}

type Response = Either<
  ResourceAlreadyExists,
  {
    real: Real
    accessToken: string
  }
>

@Injectable()
export class CreateRealService {
  constructor(
    private readonly realsRepository: RealsRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async execute({ information, name }: Request): Promise<Response> {
    const realAlreadyExistes = await this.realsRepository.findByName(name)

    if (realAlreadyExistes) {
      return left(new ResourceAlreadyExists())
    }

    const real = Real.create({
      name,
      true: information,
    })

    const token = await this.encrypter.encrypt({ sub: real.id.toString() })

    await this.realsRepository.create(real)

    return right({
      real,
      accessToken: token,
    })
  }
}
