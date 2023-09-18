import { CreateRealService } from '@modules/real/useCases/createReal/index.service'
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

const createRealBodySchema = z.object({
  name: z.string(),
  true: z.string(),
})

type CreateRealBodySchema = z.infer<typeof createRealBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createRealBodySchema)

@Controller('/real')
@Public()
export class CreateRealController {
  constructor(private readonly createRealService: CreateRealService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateRealBodySchema) {
    const { name, true: trueInformation } = body

    const response = await this.createRealService.execute({
      name,
      information: trueInformation,
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

    return {
      access_token: response.value.accessToken,
    }
  }
}
