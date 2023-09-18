import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '.'

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get<T>(key, { infer: true })
  }
}
