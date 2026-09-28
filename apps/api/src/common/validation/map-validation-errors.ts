import { ValidationError } from '@nestjs/common';
import {
  ApiExceptionDetails,
  ApiFieldError,
} from '../exceptions/api.exception.js';

export const mapValidationErrors = (
  errors: ValidationError[],
): ApiExceptionDetails =>
  errors.reduce<ApiExceptionDetails>((acc, item) => {
    const details: ApiFieldError[] = Object.values(item.constraints ?? {}).map(
      (code) => ({ code }),
    );

    if (!acc[item.property]) {
      acc[item.property] = {
        errors: [],
      };
    }

    acc[item.property].value = item.value;
    acc[item.property].errors.push(...details);

    return acc;
  }, {});
