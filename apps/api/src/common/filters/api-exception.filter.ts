import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ApiError } from '../interfaces/api-error.interface.js';
import { ERROR_CODES } from '../constants/error-codes.js';
import { ApiException, ApiExceptionDetails } from '../exceptions/api.exception.js';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response<ApiError<ApiExceptionDetails>>>();

    console.log(exception);

    if (exception instanceof ApiException) {
      const statusCode = exception.getStatus();

      response.status(statusCode).json({
        statusCode,
        code: exception.code,
        message: exception.message,
        details: exception.details,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const code = exception.errorCode ?? ERROR_CODES.INTERNAL_SERVER_ERROR;

      response.status(statusCode).json({
        statusCode,
        code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
