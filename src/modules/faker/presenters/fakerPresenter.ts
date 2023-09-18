import { Faker } from '../models/Faker'

export class FakerPresenter {
  static toHTTP(faker: Faker) {
    return {
      id: faker.id.toString(),
      name: faker.name,
      lie: faker.lie,
      tableId: faker.tableId?.toString(),
      createdAt: faker.createdAt,
      updatedAt: faker.updatedAt,
    }
  }
}
