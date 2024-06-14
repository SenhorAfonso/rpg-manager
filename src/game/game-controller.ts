import { Controller, Post, Body, UsePipes, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import AuthorizationGuard from 'src/common/guards/AuthorizationGuard';
import GameService from './game-service';
import { StartGameDTO } from './dto/start-game-dto';
import ActionObjectFormater from './interceptors/FormatActionObjectInterceptor';

@Controller('/game')
@UseGuards(AuthorizationGuard)
class GameController {

  constructor(private readonly gameService: GameService) { }

  @Post('/play')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ActionObjectFormater)
  playAdventure(
    @Body() gameInfo: StartGameDTO
  ) {
    const result = this.gameService.playAdventure(gameInfo);
    return result;
  }

}

export default GameController;