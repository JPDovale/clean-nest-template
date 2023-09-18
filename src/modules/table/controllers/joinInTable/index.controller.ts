import { PrismaService } from '@infra/database/prisma/index.service'
import { Body, Controller, Post } from '@nestjs/common'
import { Table } from '@prisma/client'
import { CurrentReal } from '@providers/auth/decorators/currentRealDecorator'
import { Public } from '@providers/auth/decorators/public'
import { TokenPayloadSchema } from '@providers/auth/strategys/jwtStrategy'
import { ZodValidationPipe } from '@shared/pipes/zodValidation'
import { z } from 'zod'

const joinInTableBodySchema = z.object({
  name: z.string(),
})

type JoinInTableBodySchema = z.infer<typeof joinInTableBodySchema>

const bodyValidationPipe = new ZodValidationPipe(joinInTableBodySchema)

@Controller('/tables/join')
@Public()
export class JoinInTableController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: JoinInTableBodySchema,
    @CurrentReal() real: TokenPayloadSchema,
  ) {
    const { name } = body
    const { sub: realId } = real

    let table: Table | null

    table = await this.prisma.table.findUnique({
      where: {
        name,
      },
    })

    return {
      table,
    }
  }
}
