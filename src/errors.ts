import { FastifyResponse } from './types'

export function sendInvalidParamError (res: FastifyResponse, param: string) {
  res.status(500).send({
    success: false,
    error: 'Internal Server Error',
    message: `Missing or invalid ${param} parameter`
  })
}

export function sendErrorMessage (res: FastifyResponse, error: Error) {
  res.status(500).send({
    success: false,
    error: 'Internal Server Error',
    message: error.message
  })
}
