import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { USER_ERROR_CODES } from '../constants/user-error-codes.js';

export class UserCreateDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: USER_ERROR_CODES.EMAIL_INVALID })
  public readonly email: string;

  @IsString({ message: USER_ERROR_CODES.PASSWORD_INVALID })
  @Length(8, 128, { message: USER_ERROR_CODES.PASSWORD_LENGTH })
  @Matches(/[A-Z]/, { message: USER_ERROR_CODES.PASSWORD_UPPERCASE_LETTER })
  @Matches(/[a-z]/, { message: USER_ERROR_CODES.PASSWORD_LOWERCASE_LETTER })
  @Matches(/[0-9]/, { message: USER_ERROR_CODES.PASSWORD_NUMBER })
  @Matches(/[^A-Za-z0-9]/, { message: USER_ERROR_CODES.PASSWORD_SYMBOL })
  @Matches(/^[\x20-\x7E]+$/, { message: USER_ERROR_CODES.PASSWORD_INVALID })
  public readonly password: string;

  @IsString({ message: USER_ERROR_CODES.FIRST_NAME_INVALID })
  @Length(1, 255, { message: USER_ERROR_CODES.FIRST_NAME_LENGTH })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  public readonly firstName: string;

  @IsOptional()
  @IsString({ message: USER_ERROR_CODES.LAST_NAME_INVALID })
  @Length(1, 255, { message: USER_ERROR_CODES.LAST_NAME_LENGTH })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  public readonly lastName?: string;
}
