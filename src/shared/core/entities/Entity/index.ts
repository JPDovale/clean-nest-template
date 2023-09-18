import { UniqueEntityId } from '../valueObjects/UniqueEntityId'

export class Entity<TypeProps> {
  private _id: UniqueEntityId

  protected props: TypeProps

  get id() {
    return this._id
  }

  protected constructor(props: TypeProps, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
