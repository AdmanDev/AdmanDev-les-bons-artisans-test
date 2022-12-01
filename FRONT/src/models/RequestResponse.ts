interface SuccessResult<T> {
  isError: false
  value: T
}

interface ErrorResult {
  isError: true
  message: string
}

export type RequestResponse<T> = SuccessResult<T> | ErrorResult
