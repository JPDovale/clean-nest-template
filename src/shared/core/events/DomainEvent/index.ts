import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
