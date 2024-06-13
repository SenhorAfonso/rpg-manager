/* eslint-disable require-await */
/* eslint-disable class-methods-use-this */
import { Controller, Body, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import CharacterService from './character-service';
import ValidateCharInfo from './guards/ValidateCharInfo';
import ValidateCharLevel from './guards/ValidateCharLevel';
import CharacterType from './dto/createCharacterDTO';
import CreateLoreInterceptor from './interceptors/CreateLoreInterceptor';

@Controller('/character')
class CharacterController {

  constructor(private readonly characterService: CharacterService) { }

  @Post('/create-char')
  @UseGuards(ValidateCharInfo, ValidateCharLevel)
  @UseInterceptors(CreateLoreInterceptor)
  async settingClass(
    @Body() createCharacterDTO: CharacterType
  ) {
    const result = await this.characterService.createChar(createCharacterDTO);
    return result;
  }

  @Post('/help')
  async settingFeature() {
    const result = await this.characterService.help();
    return result;
  }

}

export default CharacterController;