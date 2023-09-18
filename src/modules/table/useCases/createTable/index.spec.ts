import { InMemoryTablesRepository } from '@test/repositories/modules/tables/inMemoryTablesRepository'
import { FakeHasher } from 'test/repositories/providers/cryptography/fakeHasher'
import { CreateTableService } from './index.service'

let tablesRepository: InMemoryTablesRepository
let hasher: FakeHasher
let sut: CreateTableService

describe('Create table', () => {
  beforeEach(() => {
    tablesRepository = new InMemoryTablesRepository()
    hasher = new FakeHasher()

    sut = new CreateTableService(tablesRepository, hasher)
  })

  it('should be able to create an new table', async () => {
    const result = await sut.execute({
      name: 'test table',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(tablesRepository.tables[0]).toEqual(result.value?.table)
    }
  })

  it('should hash password upon registration', async () => {
    const result = await sut.execute({
      name: 'test table',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(tablesRepository.tables[0].passwordHash).toEqual('123456-hashed')
    }
  })
})
