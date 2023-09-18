import { Table } from '../models/Table'

export abstract class TablesRepository {
  abstract create(table: Table): Promise<void>
  abstract findByName(name: string): Promise<Table | null>
  abstract save(table: Table): Promise<void>
}
