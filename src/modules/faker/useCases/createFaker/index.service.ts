import { Faker } from '@modules/faker/models/Faker'
import { FakersRepository } from '@modules/faker/repositories/fakersRepository'
import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@shared/core/error/Either'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'

interface Request {
  name: string
  lie: string
}

type Response = Either<
  ResourceAlreadyExists,
  {
    faker: Faker
  }
>

@Injectable()
export class CreateFakerService {
  constructor(private readonly fakerRepository: FakersRepository) {}

  async execute({ lie, name }: Request): Promise<Response> {
    const fakerAlreadyExists = await this.fakerRepository.findByName(name)

    if (fakerAlreadyExists) {
      return left(new ResourceAlreadyExists())
    }

    const faker = Faker.create({
      name,
      lie,
    })

    await this.fakerRepository.create(faker)

    return right({
      faker,
    })
  }
}
