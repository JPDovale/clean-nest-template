import { AggregateRoot } from '@shared/core/entities/AggregateRoot'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'
import { Optional } from '@shared/core/types/Optional'

export interface FakerProps {
  name: string
  lie: string
  tableId: UniqueEntityId | null
  createdAt: Date
  updatedAt: Date | null
}

export class Faker extends AggregateRoot<FakerProps> {
  static create(
    props: Optional<FakerProps, 'tableId' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityId,
  ) {
    const fakerProps: FakerProps = {
      name: props.name,
      lie: props.lie,
      tableId: props.tableId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }

    const faker = new Faker(fakerProps, id)

    return faker
  }

  get name() {
    return this.props.name
  }

  get lie() {
    return this.props.lie
  }

  get tableId() {
    return this.props.tableId
  }

  get createdAt() {
    return this.createdAt
  }

  get updatedAt() {
    return this.updatedAt
  }
}
