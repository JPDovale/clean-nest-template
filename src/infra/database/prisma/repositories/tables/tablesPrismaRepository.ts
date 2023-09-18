import { Table } from '@modules/table/models/Table'
import { TablesRepository } from '@modules/table/repositories/tablesRepository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../index.service'
import { TablesPrismaMapper } from './tablesPrismaMapper'

@Injectable()
export class TablesPrismaRepository implements TablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(table: Table): Promise<void> {
    await this.prisma.table.create({
      data: TablesPrismaMapper.toPrismaCreate(table),
    })
  }

  async findByName(name: string): Promise<Table | null> {
    const table = await this.prisma.table.findUnique({
      where: {
        name,
      },
    })

    return table ? TablesPrismaMapper.toEntity(table) : null
  }

  async save(table: Table): Promise<void> {
    await this.prisma.table.update({
      where: {
        id: table.id.toString(),
      },
      data: TablesPrismaMapper.toPrismaUpdate(table),
    })
  }
}
