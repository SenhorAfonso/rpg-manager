/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import { Character, CharacterDocument } from 'src/character/schemas/character-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import InsuficientPlayersException from 'src/common/errors/InsuficientPlayersException';
import { playerType } from './validation/start-game-validator';
import { Game, GameDocument } from './schema/game-schema';

@Injectable()
class GameRepository {

  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>
  ) { }

  async getPlayerSheets(players: playerType) {
    const charactersSheets: CharacterDocument[] = [];
    const characters = [...new Set([...Object.values(players)])];

    if (characters.length < 3) {
      throw new InsuficientPlayersException('Must have at least three different players to start an adventure!');
    }

    await Promise.all(characters.map(async (player) => {
      const characterSheet = await this.characterModel.findOne({ name: player }, { _id: false, __v: false });
      if (!characterSheet) {
        throw new InsuficientPlayersException('Must have at least three different players to start an adventure!');
      }
      charactersSheets.push(characterSheet);
    }));

    return charactersSheets;
  }

  async createGame(gameName: string): Promise<[boolean, GameDocument]> {
    let firstRound: boolean;
    let game = await this.gameModel.findOne({ game: gameName });
    if (game) {
      firstRound = false;
    } else {
      game = await this.gameModel.create({ game: gameName });
      firstRound = true;
    }

    return [firstRound, game];
  }

  async saveHistory(gameName: string, prompt: string, response: string) {
    console.log('salvou historico')
    const gameRecord = await this.gameModel.findOne({ gameName });
    gameRecord.context.push({ role: 'user', parts: [prompt] });
    gameRecord.context.push({ role: 'model', parts: [response] });
    await gameRecord.save();
  }

}

export default GameRepository;