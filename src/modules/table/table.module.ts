import { Module } from '@nestjs/common'
import { JoinInTableController } from './controllers/joinInTable/index.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateTableController } from './controllers/createTable/index.controller'
import { CreateTableService } from './useCases/createTable/index.service'

@Module({
  controllers: [JoinInTableController, CreateTableController],
  imports: [DatabaseModule],
  providers: [CreateTableService],
})
export class TableModule {}
