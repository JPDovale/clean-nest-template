import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { FakerModule } from '@modules/faker/faker.module'
import { RealModule } from '@modules/real/real.module'
import { TableModule } from '@modules/table/table.module'
import { AuthProvider } from '@providers/auth/auth.module'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    AuthProvider,
    FakerModule,
    RealModule,
    TableModule,
  ],
})
export class AppModule {}
