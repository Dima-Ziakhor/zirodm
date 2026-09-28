import { HttpStatus, ValidationError } from '@nestjs/common';
import { ERROR_CODES } from '../constants/error-codes.js';
import { ApiException } from '../exceptions/api.exception.js';
import { mapValidationErrors } from './map-validation-errors.js';

export const validationExceptionFactory = (
  validationErrors: ValidationError[],
) =>
  new ApiException(
    HttpStatus.BAD_REQUEST,
    ERROR_CODES.VALIDATION_ERROR,
    'Validation error',
    mapValidationErrors(validationErrors),
    {
      errorCode: ERROR_CODES.VALIDATION_ERROR,
      description: 'Validation error',
    },
  );
