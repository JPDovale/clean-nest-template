import { CreateRealService } from './index.service'
import { InMemoryRealsRepository } from '@test/repositories/modules/reals/inMemoryRealsRepository'
import { FakeEncrypter } from '@test/repositories/providers/cryptography/fakeEncrypter'

let realsRepository: InMemoryRealsRepository
let encrypter: FakeEncrypter
let sut: CreateRealService

describe('Create real', () => {
  beforeEach(() => {
    realsRepository = new InMemoryRealsRepository()
    encrypter = new FakeEncrypter()

    sut = new CreateRealService(realsRepository, encrypter)
  })

  it('should be able to create an new real', async () => {
    const result = await sut.execute({
      name: 'test table',
      information: 'This is one test',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toEqual({
        real: realsRepository.reals[0],
        accessToken: expect.any(String),
      })
    }
  })
})
