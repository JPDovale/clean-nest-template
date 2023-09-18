import { Module } from '@nestjs/common'
import { CreateFakerController } from './controllers/createFaker/index.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateFakerService } from './useCases/createFaker/index.service'

@Module({
  controllers: [CreateFakerController],
  imports: [DatabaseModule],
  providers: [CreateFakerService],
})
export class FakerModule {}
