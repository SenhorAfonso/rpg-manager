import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Gemini from 'src/common/getGemini';
import PromptGenerator from 'src/common/PromptGenerator';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { CharacterAlignments, AlignmentsSchema } from 'src/populate/schemas/alignments-schema';
import { CharacterClass, CharacterClassSchema } from 'src/populate/schemas/classes-schema';
import { CharacterFeats, FeatsSchema } from 'src/populate/schemas/feats-schema';
import { CharacterFeature, FeatureSchema } from 'src/populate/schemas/features-schema';
import { CharacterMagicItem, MagicItemSchema } from 'src/populate/schemas/magic-items-schema';
import { CharacterProficiency, ProficiencySchema } from 'src/populate/schemas/proficiencies-schema';
import { CharacterSpell, SpellSchema } from 'src/populate/schemas/spells-schema';
import CharacterRepository from './character-repository';
import CharacterService from './character-service';
import CharacterController from './character-controller';
import { Character, CharacterSchema } from './schemas/character-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
    MongooseModule.forFeature([{ name: CharacterAlignments.name, schema: AlignmentsSchema }]),
    MongooseModule.forFeature([{ name: CharacterClass.name, schema: CharacterClassSchema }]),
    MongooseModule.forFeature([{ name: CharacterFeature.name, schema: FeatureSchema }]),
    MongooseModule.forFeature([{ name: CharacterFeats.name, schema: FeatsSchema }]),
    MongooseModule.forFeature([{ name: CharacterMagicItem.name, schema: MagicItemSchema }]),
    MongooseModule.forFeature([{ name: CharacterProficiency.name, schema: ProficiencySchema }]),
    MongooseModule.forFeature([{ name: CharacterSpell.name, schema: SpellSchema }]),
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