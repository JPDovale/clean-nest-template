import { FakersRepository } from '@modules/faker/repositories/fakersRepository'
import { RealsRepository } from '@modules/real/repositories/realsRepository'
import { TablesRepository } from '@modules/table/repositories/tablesRepository'
import { HashComparer } from '@providers/cryptography/contracts/hashComparer'
import { Either, left, right } from '@shared/core/error/Either'
import { PermissionDenied } from '@shared/errors/PermissionDenied'
import { ResourceNotFount } from '@shared/errors/ResourceNotFound'

interface Request {
  name: string
  password?: string
  informationId: string
}

type Response = Either<PermissionDenied | ResourceNotFount, null>

export class JoinInTableService {
  constructor(
    private readonly tablesRepository: TablesRepository,
    private readonly fakersRepository: FakersRepository,
    private readonly realsRepository: RealsRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async execute({ name, password, informationId }: Request): Promise<Response> {
    const table = await this.tablesRepository.findByName(name)

    if (!table) {
      return left(new ResourceNotFount())
    }

    if (password) {
      const passwordMatch = this.hashComparer.compare(
        password,
        table.passwordHash,
      )

      if (!passwordMatch) {
        return left(new PermissionDenied())
      }

      const faker = await this.fakersRepository.findById(informationId)

      if (!faker) {
        return left(new ResourceNotFount())
      }

      table.fakers.add(faker)
      await this.tablesRepository.save(table)
    } else {
      const real = await this.realsRepository.findById(informationId)

      if (!real) {
        return left(new ResourceNotFount())
      }

      table.reals.add(real)

      await this.realsRepository.save(real)
    }

    return right(null)
  }
}
