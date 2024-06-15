import { Controller, Body, Post, UseGuards, UseInterceptors, UsePipes, Get } from '@nestjs/common';
import AuthorizationGuard from 'src/common/guards/AuthorizationGuard';
import CharacterService from './character-service';
import ValidateCharInfo from './pipes/ValidateCharInfo';
import CharacterType from './dto/CreateCharacterDTO';
import CreateLoreInterceptor from './interceptors/CreateLoreInterceptor';
import ValidateCharLevel from './pipes/ValidateCharLevel';

@Controller('/character')
@UseGuards(AuthorizationGuard)
class CharacterController {

  constructor(private readonly characterService: CharacterService) { }

  @Post('/create-char')
  @UsePipes(ValidateCharInfo, ValidateCharLevel)
  @UseInterceptors(CreateLoreInterceptor)
  async settingClass(
    @Body() createCharacterDTO: CharacterType
  ) {
    const result = await this.characterService.createChar(createCharacterDTO);
    return result;
  }

  @Get('/help')
  async settingFeature() {
    const result = await this.characterService.help();
    return result;
  }

}

export default CharacterController;