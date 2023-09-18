import { Faker } from '@modules/faker/models/Faker'
import { WatchedList } from '@shared/core/entities/WatchedList'

export class TableFakersList extends WatchedList<Faker> {
  compareItems(a: Faker, b: Faker): boolean {
    return a.id.equals(b.id)
  }
}
