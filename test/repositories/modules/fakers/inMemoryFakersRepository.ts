import { Faker } from '@modules/faker/models/Faker'
import { FakersRepository } from '@modules/faker/repositories/fakersRepository'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export class InMemoryFakersRepository implements FakersRepository {
  public fakers: Faker[] = []

  async create(faker: Faker): Promise<void> {
    this.fakers.push(faker)
  }

  async findById(id: string): Promise<Faker | null> {
    const faker = this.fakers.find((faker) =>
      faker.id.equals(new UniqueEntityId(id)),
    )
    return faker ?? null
  }

  async findByName(name: string): Promise<Faker | null> {
    const faker = this.fakers.find((faker) => faker.name === name)
    return faker ?? null
  }
}
