import { Controller, Body, Post, UseGuards, UseInterceptors, UsePipes, Get, ValidationPipe } from '@nestjs/common';
import AuthorizationGuard from 'src/common/guards/AuthorizationGuard';
import CharacterService from './character-service';
import ValidateCharInfo from './pipes/ValidateCharInfo';
import CharacterType from './dto/CreateCharacterDTO';
import CreateLoreInterceptor from './interceptors/CreateLoreInterceptor';
import ValidateCharLevel from './pipes/ValidateCharLevel';
import CreateRandomCharacterDTO from './dto/CreateRandomCharacterDTO';

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

  @Post('/create-random')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRandomChar(@Body() charInfo: CreateRandomCharacterDTO) {
    const result = await this.characterService.createRandomChar(charInfo.charLevel, charInfo.name);
    return result;
  }

}

export default CharacterController;