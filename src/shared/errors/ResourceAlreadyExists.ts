import { ServiceError } from '@shared/core/error/ServiceError'

export class ResourceAlreadyExists extends Error implements ServiceError {
  status = 400

  constructor() {
    super('Resource already exists')
  }
}
