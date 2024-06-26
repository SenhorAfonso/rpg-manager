import { Injectable } from '@nestjs/common';
import Gemini from 'src/common/getGemini';
import { Monster, MonsterDocument } from 'src/populate/schemas/monsters-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import GameRepository from './game-repository';
import PromptGenerator from '../common/PromptGenerator';
import playAdventureType from './types/playAdventureType';
import { StartGameDTO } from './dto/start-game-dto';

@Injectable()
class GameService {

  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gemini: Gemini,
    private readonly promptGenerator: PromptGenerator,
    @InjectModel(Monster.name) private readonly monstersSchema : Model<MonsterDocument>
  ) { }

  async playAdventure(gameInfo: StartGameDTO) {
    const { action, gameName, players } = gameInfo;
    const playersSheets = await this.gameRepository.getPlayerSheets(players);
    const [firstRound, game] = await this.gameRepository.createGame(gameName);
    return this.getGeminiResponse({ game, playersSheets, action, firstRound });
  }

  private async getGeminiResponse({
    game,
    playersSheets,
    action,
    firstRound
  }: playAdventureType):
    Promise<string>
  {
    const generalRules: string = this.promptGenerator.generalRules();

    let response: string = '';
    let currentResponse: string = '';
    let prompt: string = '';

    if (firstRound) {
      prompt = this.promptGenerator.firstRoundPrompt(playersSheets);
    } else {
      prompt = this.promptGenerator.otherRoundsPrompt(action, generalRules);
    }

    response = await this.gemini.sendGamePrompt(game.context, prompt);
    await this.gameRepository.saveHistory(game.game, prompt, response);

    if (response.includes('COMBATE: DESCONHECIDO')) {
      const enemyList = await this.monstersSchema.find({});
      const enemySheet = enemyList[Math.floor(Math.random() * enemyList.length)];
      prompt = this.promptGenerator.preCombatPrompt(enemySheet);
      currentResponse = await this.gemini.sendGamePrompt(game.context, prompt);
      await this.gameRepository.saveHistory(game.game, prompt, currentResponse);
    } else if (response.includes('FIM DE COMBATE')) {
      prompt = this.promptGenerator.finishCombatPrompt();
      currentResponse = await this.gemini.sendGamePrompt(game.context, prompt);
      await this.gameRepository.saveHistory(game.game, prompt, currentResponse);
    }

    response = `${response.replace('O que vocês farão agora?', '')} \n\n\n ${currentResponse}`;
    return response.replace('**FIM DE COMBATE**', '').replace('**COMBATE: DESCONHECIDO**', '');
  }

}

export default GameService;