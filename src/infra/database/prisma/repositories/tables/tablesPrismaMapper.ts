import { Table } from '@modules/table/models/Table'
import { Prisma, Table as TablePrisma } from '@prisma/client'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export class TablesPrismaMapper {
  static toEntity(raw: TablePrisma): Table {
    return Table.create(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        passwordHash: raw.passwordHash,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrismaCreate(table: Table): Prisma.TableUncheckedCreateInput {
    const informationsConnectIds: Array<{ id: string }> = []

    table.fakers
      .getNewItems()
      .forEach((faker) =>
        informationsConnectIds.push({ id: faker.id.toString() }),
      )
    table.reals
      .getNewItems()
      .forEach((real) =>
        informationsConnectIds.push({ id: real.id.toString() }),
      )

    return {
      id: table.id.toString(),
      name: table.name,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      passwordHash: table.passwordHash,
      informations: {
        connect: informationsConnectIds,
      },
    }
  }

  static toPrismaUpdate(
    table: Table,
  ): Prisma.TableUncheckedCreateInput | Prisma.TableUncheckedUpdateInput {
    const informationsConnectIds: Array<{ id: string }> = []
    const informationsToDisconnectIds: Array<{ id: string }> = []

    table.fakers
      .getNewItems()
      .forEach((faker) =>
        informationsConnectIds.push({ id: faker.id.toString() }),
      )
    table.reals
      .getNewItems()
      .forEach((real) =>
        informationsConnectIds.push({ id: real.id.toString() }),
      )

    table.fakers
      .getRemovedItems()
      .forEach((faker) =>
        informationsToDisconnectIds.push({ id: faker.id.toString() }),
      )
    table.reals
      .getRemovedItems()
      .forEach((real) =>
        informationsToDisconnectIds.push({ id: real.id.toString() }),
      )

    return {
      id: table.id.toString(),
      name: table.name,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
      passwordHash: table.passwordHash,
      informations: {
        connect: informationsConnectIds,
        disconnect: informationsConnectIds,
      },
    }
  }
}
