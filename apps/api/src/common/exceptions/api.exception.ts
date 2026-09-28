import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export interface ApiFieldError {
  code: string;
  message?: string;
}

export type ApiFieldDetail = {
  value?: unknown;
  errors: ApiFieldError[];
};

export type ApiExceptionDetails = Record<string, ApiFieldDetail>;

export interface ApiExceptionResponse {
  code: string;
  message: string;
  details?: ApiExceptionDetails;
}

export class ApiException extends HttpException {
  public readonly code: string;
  public readonly message: string;
  public readonly details?: ApiExceptionDetails;

  constructor(
    statusCode: HttpStatus,
    code: string,
    message: string,
    details?: ApiExceptionDetails,
    options?: HttpExceptionOptions,
  ) {
    const response: ApiExceptionResponse = {
      code,
      message,
      ...(details ? { details } : {}),
    };

    super(response, statusCode, options);

    this.code = code;
    this.message = message;
    this.details = details;
  }
}
