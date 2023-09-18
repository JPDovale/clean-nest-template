import { Table } from '@modules/table/models/Table'
import { TablesRepository } from '@modules/table/repositories/tablesRepository'

export class InMemoryTablesRepository implements TablesRepository {
  public tables: Table[] = []

  async create(table: Table): Promise<void> {
    this.tables.push(table)
  }

  async findByName(name: string): Promise<Table | null> {
    const table = this.tables.find((table) => table.name === name)
    return table ?? null
  }

  async save(table: Table): Promise<void> {
    const tableIndex = this.tables.findIndex((t) => t.id.equals(table.id))

    this.tables[tableIndex] = table
  }
}
