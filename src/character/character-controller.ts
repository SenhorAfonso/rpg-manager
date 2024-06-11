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

  @Post(':char/set-feats/:feat')
  @UseGuards(ValidateCharInfo)
  async settingFeature2() {
    return 'Setting char feature';
  }

  @Post(':char/set-alignment/:alignment')
  @UseGuards(ValidateCharInfo)
  async settingFeature3() {
    return 'Setting char feature';
  }

  @Post(':char/set-proficiencies/:proficiency')
  @UseGuards(ValidateCharInfo)
  async settingFeature4() {
    return 'Setting char feature';
  }

  @Post(':char/set-spells/:spell')
  @UseGuards(ValidateCharInfo)
  async settingFeature5() {
    return 'Setting char feature';
  }

  @Post(':char/set-item/:item')
  @UseGuards(ValidateCharInfo)
  async settingFeature6() {
    return 'Setting char feature';
  }

}

export default CharacterController;