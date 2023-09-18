import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { Optional } from '@shared/core/types/Optional'

interface RealProps {
  name: string
  true: string
  tableId: UniqueEntityId | null
  createdAt: Date
  updatedAt: Date | null
}

export class Real extends AggregateRoot<RealProps> {
  static create(
    props: Optional<RealProps, 'tableId' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const realProps: RealProps = {
      name: props.name,
      true: props.true,
      tableId: props.tableId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const real = new Real(realProps, id)

    return real
  }

  get name() {
    return this.props.name
  }

  get true() {
    return this.props.true
  }

  get tableId() {
    return this.props.tableId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
