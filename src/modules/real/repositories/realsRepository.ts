import { Real } from '../models/Real'

export abstract class RealsRepository {
  abstract create(real: Real): Promise<void>
  abstract findById(id: string): Promise<Real | null>
  abstract findByName(name: string): Promise<Real | null>
  abstract save(real: Real): Promise<void>
}
