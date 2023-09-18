import { Faker } from '../models/Faker'

export abstract class FakersRepository {
  abstract create(faker: Faker): Promise<void>
  abstract findById(id: string): Promise<Faker | null>
  abstract findByName(name: string): Promise<Faker | null>
}
