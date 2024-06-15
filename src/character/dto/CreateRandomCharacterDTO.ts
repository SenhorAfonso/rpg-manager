import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

const MIN_LEVEL_VALUE: number = 1;
const MIN_STRING_LENGTH: number = 1;

class CreateRandomCharacterDTO {
  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_LEVEL_VALUE)
  readonly charLevel: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly name: string;
}

export default CreateRandomCharacterDTO;