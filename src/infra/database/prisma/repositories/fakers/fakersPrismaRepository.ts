import { Faker } from '@modules/faker/models/Faker'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../index.service'
import { FakersPrismaMapper } from './fakersPrismaMapper'
import { FakersRepository } from '@modules/faker/repositories/fakersRepository'

@Injectable()
export class FakersPrismaRepository implements FakersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(faker: Faker): Promise<void> {
    await this.prisma.information.create({
      data: FakersPrismaMapper.toPrisma(faker),
    })
  }

  async findById(id: string): Promise<Faker | null> {
    const faker = await this.prisma.information.findUnique({
      where: {
        id,
      },
    })

    if (!faker) return null

    return FakersPrismaMapper.toEntity(faker)
  }

  async findByName(name: string): Promise<Faker | null> {
    const faker = await this.prisma.information.findUnique({
      where: {
        name,
      },
    })

    if (!faker) return null

    return FakersPrismaMapper.toEntity(faker)
  }
}
