import { Real } from '@modules/real/models/Real'
import { RealsRepository } from '@modules/real/repositories/realsRepository'
import { UniqueEntityId } from '@shared/core/entities/valueObjects/UniqueEntityId'

export class InMemoryRealsRepository implements RealsRepository {
  public reals: Real[] = []

  async create(real: Real): Promise<void> {
    this.reals.push(real)
  }

  async findById(id: string): Promise<Real | null> {
    const real = this.reals.find((real) =>
      real.id.equals(new UniqueEntityId(id)),
    )
    return real ?? null
  }

  async findByName(name: string): Promise<Real | null> {
    const real = this.reals.find((real) => real.name === name)
    return real ?? null
  }

  async save(real: Real): Promise<void> {
    const realIndex = this.reals.findIndex((r) => r.id.equals(real.id))
    this.reals[realIndex] = real
  }
}
