import { Real } from '@modules/real/models/Real'
import { Information as RealPrisma, Prisma } from '@prisma/client'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export class RealsPrismaMapper {
  static toEntity(raw: RealPrisma): Real {
    return Real.create(
      {
        name: raw.name,
        true: raw.information,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        tableId: raw.tableId ? new UniqueEntityId(raw.tableId) : null,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(real: Real): Prisma.InformationUncheckedCreateInput {
    return {
      id: real.id.toString(),
      tableId: real.tableId?.toString(),
      information: real.true,
      informationType: 'REAL',
      name: real.name,
      createdAt: real.createdAt,
      updatedAt: real.updatedAt,
    }
  }
}
