import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(err),
          message: 'Cant be validate received data',
          statusCode: 400,
        })
      }

      throw new BadRequestException('Cant be validate received data')
    }

    return value
  }
}
