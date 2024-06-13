import { Module } from '@nestjs/common';
import CharactersModule from 'src/character/character-module';
import { MongooseModule } from '@nestjs/mongoose';
import Gemini from 'src/common/getGemini';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import GameController from './game-controller';
import GameService from './game-service';
import GameRepository from './game-repository';
import { Game, GameSchema } from './schema/game-schema';
import PromptGenerator from '../common/PromptGenerator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    CharactersModule],
  controllers: [GameController],
  providers: [
    GameService,
    GameRepository,
    ConfigService,
    GoogleGenerativeAI,
    {
      provide: 'GEMINI_CONFIG',
      useValue: { temperature: 1, topP: 0.95, topK: 64, maxOutputTokens: 8192, responseMimeType: 'text/plain' }
    },
    Gemini,
    PromptGenerator
  ],
  exports: [Gemini]
})
class GameModule {}

export default GameModule;