import { Real } from '@modules/real/models/Real'
import { WatchedList } from '@shared/core/entities/WatchedList'

export class TableRealsList extends WatchedList<Real> {
  compareItems(a: Real, b: Real): boolean {
    return a.id.equals(b.id)
  }
}
