import { IsString, IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';

const MIN_STRING_LENGTH: number = 3;
const MIN_LEVEL_VALUE: number = 1;

class CreateCharacterDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly classes: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly features: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly feats: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly alignments: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly proficiencies: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly spells: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly magicItem: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_STRING_LENGTH)
  readonly lore?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(MIN_LEVEL_VALUE)
  readonly charLevel?: number;

}

export default CreateCharacterDTO;