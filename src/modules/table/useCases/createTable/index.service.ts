import { Table } from '@modules/table/models/Table'
import { TablesRepository } from '@modules/table/repositories/tablesRepository'
import { HashGenerator } from '@providers/cryptography/contracts/hashGenerator'
import { Either, left, right } from '@shared/core/error/Either'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'

interface Request {
  name: string
  password: string
}

type Response = Either<
  ResourceAlreadyExists,
  {
    table: Table
  }
>

export class CreateTableService {
  constructor(
    private readonly tablesRepository: TablesRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({ name, password }: Request): Promise<Response> {
    const tableExists = await this.tablesRepository.findByName(name)

    if (tableExists) {
      return left(new ResourceAlreadyExists())
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const table = Table.create({
      name,
      passwordHash,
    })

    await this.tablesRepository.create(table)

    return right({
      table,
    })
  }
}
