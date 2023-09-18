import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@shared/pipes/zodValidation'
import { FakerPresenter } from '@modules/faker/presenters/fakerPresenter'
import { CreateFakerService } from '@modules/faker/useCases/createFaker/index.service'
import { ResourceAlreadyExists } from '@shared/errors/ResourceAlreadyExists'
import { Public } from '@providers/auth/decorators/public'

const createFakerBodySchema = z.object({
  name: z.string(),
  lie: z.string(),
})

type CreateFakerBodySchema = z.infer<typeof createFakerBodySchema>
const bodyValidationPipe = new ZodValidationPipe(createFakerBodySchema)

@Controller('/faker')
@Public()
export class CreateFakerController {
  constructor(private readonly createFaker: CreateFakerService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateFakerBodySchema) {
    const { name, lie } = body

    const result = await this.createFaker.execute({ name, lie })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExists: {
          throw new ConflictException(error.message)
        }

        default: {
          throw new BadRequestException()
        }
      }
    }

    return {
      faker: FakerPresenter.toHTTP(result.value.faker),
    }
  }
}
