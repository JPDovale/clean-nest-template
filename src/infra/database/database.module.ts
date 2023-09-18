import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/index.service'
import { FakersPrismaRepository } from './prisma/repositories/fakers/fakersPrismaRepository'
import { FakersRepository } from '@modules/faker/repositories/fakersRepository'
import { TablesRepository } from '@modules/table/repositories/tablesRepository'
import { TablesPrismaRepository } from './prisma/repositories/tables/tablesPrismaRepository'
import { RealsRepository } from '@modules/real/repositories/realsRepository'
import { RealsPrismaRepository } from './prisma/repositories/reals/realsPrismaRepository'

@Module({
  providers: [
    PrismaService,
    { provide: FakersRepository, useClass: FakersPrismaRepository },
    { provide: TablesRepository, useClass: TablesPrismaRepository },
    { provide: RealsRepository, useClass: RealsPrismaRepository },
  ],
  exports: [PrismaService, FakersRepository, TablesRepository, RealsRepository],
})
export class DatabaseModule {}
