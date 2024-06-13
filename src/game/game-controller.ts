import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import GameService from "./game-service";
import ZodValidatorPipe from "src/common/pipes/ZodValidatorPipe";
import { startGameValidatorObject, startGameType } from "./validation/start-game-validator";

@Controller('/game')
class GameController {

  constructor(private readonly gameService: GameService) { }

  @Post('/play')
  @UsePipes(new ZodValidatorPipe(startGameValidatorObject))
  playAdventure(
    @Body() gameInfo: startGameType
  ) {
    const result = this.gameService.playAdventure(gameInfo);
    return result;
  }

}

export default GameController;