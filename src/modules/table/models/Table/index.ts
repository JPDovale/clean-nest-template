import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { TableFakersList } from '../TableFakersList'
import { TableRealsList } from '../TableRealsList'
import { Optional } from '@shared/core/types/Optional'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

interface TableProps {
  name: string
  passwordHash: string
  createdAt: Date
  updatedAt?: Date | null

  fakers: TableFakersList
  reals: TableRealsList
}

export class Table extends AggregateRoot<TableProps> {
  static create(
    props: Optional<TableProps, 'createdAt' | 'updatedAt' | 'fakers' | 'reals'>,
    id?: UniqueEntityId,
  ) {
    const tableProps: TableProps = {
      name: props.name,
      passwordHash: props.passwordHash,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      fakers: props.fakers ?? new TableFakersList(),
      reals: props.reals ?? new TableRealsList(),
    }

    const table = new Table(tableProps, id)

    return table
  }

  get name() {
    return this.props.name
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get fakers() {
    return this.props.fakers
  }

  get reals() {
    return this.props.reals
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
