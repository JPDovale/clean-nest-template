import { InMemoryFakersRepository } from '@test/repositories/modules/fakers/inMemoryFakersRepository'
import { CreateFakerService } from './index.service'
import { makeFaker } from '@test/factories/modules/faker'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'

let fakersRepository: InMemoryFakersRepository
let sut: CreateFakerService

describe('Create faker', () => {
  beforeEach(() => {
    fakersRepository = new InMemoryFakersRepository()
    sut = new CreateFakerService(fakersRepository)
  })

  it('should be able to create an new faker', async () => {
    const result = await sut.execute({
      name: 'test table',
      lie: 'This is one test',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toEqual({
        faker: fakersRepository.fakers[0],
      })
    }
  })

  it('not should be able to create an new faker with same name', async () => {
    const faker = makeFaker({
      name: 'test faker',
    })

    await fakersRepository.create(faker)

    const result = await sut.execute({
      name: 'test faker',
      lie: 'This is one test',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceAlreadyExists)
  })
})
