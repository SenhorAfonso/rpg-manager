import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import IsEqualFieldsConstraint from './constraints/IsEqualFieldsConstraint';

const MIN_STRING_LENGTH: number = 6;

class RegisterUserDTO {

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  @Validate(IsEqualFieldsConstraint, ['password'])
    confirmPassword: string;

}

export default RegisterUserDTO;