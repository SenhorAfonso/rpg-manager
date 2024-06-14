import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

const MIN_STRING_LENGTH: number = 6;

class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly password: string;
}

export default LoginUserDTO;
