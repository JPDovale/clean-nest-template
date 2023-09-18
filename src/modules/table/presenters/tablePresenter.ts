import { Table } from '../models/Table'

export class TablePresenter {
  static toHTTP(table: Table) {
    return {
      id: table.id.toString(),
      name: table.name,
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    }
  }
}
