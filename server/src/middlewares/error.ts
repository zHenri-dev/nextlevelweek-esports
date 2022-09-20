import { NextFunction, Request, Response } from 'express'

export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorMiddleware = (
  (
    error: Error & Partial<ApiError>,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const statusCode = error.statusCode ?? 500
    const message = error.message ?? 'Internal Server Error'

    return response.status(statusCode).json({ message })
  }
)