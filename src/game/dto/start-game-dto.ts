import { IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';

const MIN_STRING_LENGTH: number = 1;

class Player {
  @IsString()
  @MinLength(MIN_STRING_LENGTH, { message: 'An adventure must have at least three characters' })
  readonly character1: string;

  @IsString()
  @MinLength(MIN_STRING_LENGTH, { message: 'An adventure must have at least three characters' })
  readonly character2: string;

  @IsString()
  @MinLength(MIN_STRING_LENGTH, { message: 'An adventure must have at least three characters' })
  readonly character3: string;
}

class Action {
  [key: string]: string;
}

export class StartGameDTO {
  @IsString()
  @IsNotEmpty()
  readonly gameName: string;

  @ValidateNested()
  readonly players: Player;

  @ValidateNested()
  readonly action: Action;
}

export type playerType = {
  character1?: string,
  character2?: string,
  character3?: string,
}