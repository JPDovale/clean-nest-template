import { TablePresenter } from '@modules/table/presenters/tablePresenter'
import { CreateTableService } from '@modules/table/useCases/createTable/index.service'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { Public } from '@providers/auth/decorators/public'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'
import { ZodValidationPipe } from '@shared/pipes/zodValidation'
import { z } from 'zod'

const createTableBodySchema = z.object({
  name: z.string(),
  password: z.string(),
})

type CreateTableBodySchema = z.infer<typeof createTableBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createTableBodySchema)

@Controller('/table')
@Public()
export class CreateTableController {
  constructor(private readonly createTableService: CreateTableService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateTableBodySchema) {
    const { name, password } = body

    const response = await this.createTableService.execute({
      name,
      password,
    })

    if (response.isLeft()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceAlreadyExists: {
          throw new ConflictException(error.message)
        }

        default: {
          throw new BadRequestException()
        }
      }
    }

    const { table } = response.value

    return {
      table: TablePresenter.toHTTP(table),
    }
  }
}
