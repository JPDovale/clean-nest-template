import { fakerPT_BR } from '@faker-js/faker'
import { Faker, FakerProps } from '@modules/faker/models/Faker'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export function makeFaker(
  override: Partial<FakerProps> = {},
  id?: UniqueEntityId,
) {
  const faker = Faker.create(
    {
      name: fakerPT_BR.lorem.words(8),
      lie: fakerPT_BR.lorem.sentence(32),
      ...override,
    },
    id,
  )

  return faker
}
