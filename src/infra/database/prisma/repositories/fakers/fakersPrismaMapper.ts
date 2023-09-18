import { Faker } from '@modules/faker/models/Faker'
import { Information as FakerPrisma, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export class FakersPrismaMapper {
  static toEntity(raw: FakerPrisma): Faker {
    return Faker.create(
      {
        name: raw.name,
        lie: raw.information,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        tableId: raw.tableId ? new UniqueEntityId(raw.tableId) : null,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(faker: Faker): Prisma.InformationUncheckedCreateInput {
    return {
      id: faker.id.toString(),
      tableId: faker.tableId?.toString(),
      information: faker.lie,
      informationType: 'FAKER',
      name: faker.name,
      createdAt: faker.createdAt,
      updatedAt: faker.updatedAt,
    }
  }
}
