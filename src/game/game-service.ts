/* eslint-disable max-statements */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-multi-str */
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Gemini from 'src/common/getGemini';
import { startGameType } from './validation/start-game-validator';
import GameRepository from './game-repository';
import PromptGenerator from '../common/PromptGenerator';

@Injectable()
class GameService {

  constructor(
    private readonly gameRepository: GameRepository,
    private readonly configService: ConfigService,
    private readonly gemini: Gemini,
    private readonly promptGenerator: PromptGenerator
  ) { }

  async playAdventure(gameInfo: startGameType) {
    const { action, gameName, players } = gameInfo;

    for (const key in action) {
      const newKey = players[key];
      action[newKey] = action[key];
      delete action[key];
    }

    const playersSheets = await this.gameRepository.getPlayerSheets(players);
    const [firstRound, game] = await this.gameRepository.createGame(gameName);
    return this.getGeminiResponse(game, playersSheets, action, firstRound);
  }

  private async getGeminiResponse(game, playersSheets, action, firstRound) {
    const generalRules: string = this.promptGenerator.generalRules();

    let response: string;
    let currentResponse: string = '';
    let prompt: string;

    if (firstRound) {
      prompt = this.promptGenerator.firstRoundPrompt(playersSheets);
    } else {
      prompt = this.promptGenerator.otherRoundsPrompt(action, generalRules);
    }

    response = await this.gemini.sendPrompt(game.context, prompt);
    await this.gameRepository.saveHistory(game.gameName, prompt, response);

    if (response.includes('COMBATE: DESCONHECIDO')) {
      const enemySheet = await (await fetch('https://www.dnd5eapi.co/api/monsters/centaur')).json();
      prompt = this.promptGenerator.preCombatPrompt(enemySheet);
      currentResponse = await this.gemini.sendPrompt(game.context, prompt);
      await this.gameRepository.saveHistory(game.gameName, prompt, currentResponse);
    } else if (response.includes('FIM DE COMBATE')) {
      prompt = this.promptGenerator.finishCombatPrompt();
      currentResponse = await this.gemini.sendPrompt(game.context, prompt);
      await this.gameRepository.saveHistory(game.gameName, prompt, currentResponse);
    }

    console.log(prompt)
    response = `${response.replace('O que vocês farão agora?', '')} \n\n\n ${currentResponse}`;
    return response.replace('**FIM DE COMBATE**', '').replace('**COMBATE: DESCONHECIDO**', '');
  }

}

export default GameService;