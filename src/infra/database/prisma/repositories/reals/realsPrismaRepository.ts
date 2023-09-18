import { Real } from '@modules/real/models/Real'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../index.service'
import { RealsPrismaMapper } from './realsPrismaMapper'
import { RealsRepository } from '@modules/real/repositories/realsRepository'

@Injectable()
export class RealsPrismaRepository implements RealsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(real: Real): Promise<void> {
    await this.prisma.information.create({
      data: RealsPrismaMapper.toPrisma(real),
    })
  }

  async findById(id: string): Promise<Real | null> {
    const real = await this.prisma.information.findUnique({
      where: {
        id,
      },
    })

    if (!real) return null

    return RealsPrismaMapper.toEntity(real)
  }

  async findByName(name: string): Promise<Real | null> {
    const real = await this.prisma.information.findUnique({
      where: {
        name,
      },
    })

    if (!real) return null

    return RealsPrismaMapper.toEntity(real)
  }

  async save(real: Real): Promise<void> {
    await this.prisma.information.update({
      where: {
        id: real.id.toString(),
      },
      data: RealsPrismaMapper.toPrisma(real),
    })
  }
}
