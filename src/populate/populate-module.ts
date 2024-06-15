import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PopulateController from './populate-controller';
import PopulateService from './populate-service';
import PopulateRepository from './populate-repository';
import { CharacterAlignments, AlignmentsSchema } from './schemas/alignments-schema';
import { CharacterClass, CharacterClassSchema } from './schemas/classes-schema';
import { CharacterProficiency, ProficiencySchema } from './schemas/proficiencies-schema';
import { CharacterFeature, FeatureSchema } from './schemas/features-schema';
import { CharacterFeats, FeatsSchema } from './schemas/feats-schema';
import { CharacterMagicItem, MagicItemSchema } from './schemas/magic-items-schema';
import { CharacterSpell, SpellSchema } from './schemas/spells-schema';
import { Monster, MonsterSchema } from './schemas/monsters-schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CharacterAlignments.name, schema: AlignmentsSchema }]),
    MongooseModule.forFeature([{ name: CharacterClass.name, schema: CharacterClassSchema }]),
    MongooseModule.forFeature([{ name: CharacterFeature.name, schema: FeatureSchema }]),
    MongooseModule.forFeature([{ name: CharacterFeats.name, schema: FeatsSchema }]),
    MongooseModule.forFeature([{ name: CharacterMagicItem.name, schema: MagicItemSchema }]),
    MongooseModule.forFeature([{ name: CharacterProficiency.name, schema: ProficiencySchema }]),
    MongooseModule.forFeature([{ name: CharacterSpell.name, schema: SpellSchema }]),
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }]),
  ],
  controllers: [PopulateController],
  providers: [PopulateService, PopulateRepository]
})
class PopulateModule { }

export default PopulateModule;