import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Gemini from 'src/common/getGemini';
import PromptGenerator from 'src/common/PromptGenerator';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { Character, CharacterSchema } from './schemas/character-schema';
import CharacterController from './character-controller';
import CharacterService from './character-service';
import CharacterRepository from './character-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])
  ],
  controllers: [CharacterController],
  providers: [
    CharacterService,
    CharacterRepository,
    ConfigService,
    GoogleGenerativeAI,
    {
      provide: 'GEMINI_CONFIG',
      useValue: { temperature: 1, topP: 0.95, topK: 64, maxOutputTokens: 8192, responseMimeType: 'text/plain' }
    },
    Gemini,
    PromptGenerator
  ],
  exports: [MongooseModule]
})
class CharactersModule {}
export default CharactersModule;