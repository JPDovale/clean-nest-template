import { ServiceError } from '@shared/core/error/ServiceError'

export class ResourceNotFount extends Error implements ServiceError {
  status = 400

  constructor() {
    super('Resource not found')
  }
}
