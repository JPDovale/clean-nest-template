import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public toString() {
    return this.value
  }

  public toValue() {
    return this.value
  }

  public equals(id: UniqueEntityId) {
    return this.value === id.toValue()
  }
}
