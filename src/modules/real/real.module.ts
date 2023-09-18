import { Module } from '@nestjs/common'
import { CreateRealController } from './controllers/createReal/index.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { CreateRealService } from './useCases/createReal/index.service'
import { CryptographyModule } from '@providers/cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateRealController],
  providers: [CreateRealService],
})
export class RealModule {}
