export interface ApplicationErrorProps {
  value: any
  error: string
  property: string
  constraints: string[]
}

export class ApplicationError {
  error: string | null

  value: string

  property: string

  constraints: string[]

  constructor(props: ApplicationErrorProps) {
    this.value = JSON.stringify(props.value)
    this.error = props.error
    this.property = props.property
    this.constraints = props.constraints
  }
}
