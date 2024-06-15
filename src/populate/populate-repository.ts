import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterAlignments, AlignmentsDocument } from './schemas/alignments-schema';
import { CharacterClass, ClassDocument } from './schemas/classes-schema';
import { CharacterFeature, FeatureDocument } from './schemas/features-schema';
import { CharacterFeats, FeatsDocument } from './schemas/feats-schema';
import { CharacterMagicItem, MagicItemDocument } from './schemas/magic-items-schema';
import { CharacterProficiency, ProficiencyDocument } from './schemas/proficiencies-schema';
import { CharacterSpell, SpellDocument } from './schemas/spells-schema';
import FeatureToSchemaEnum from './enums/CharacterFeatures-enum';

@Injectable()
class PopulateRepository {

  constructor(
    @InjectModel(CharacterAlignments.name) private readonly alignmentsSchema: Model<AlignmentsDocument>,
    @InjectModel(CharacterClass.name) private readonly classSchema: Model<ClassDocument>,
    @InjectModel(CharacterFeature.name) private readonly featureSchema: Model<FeatureDocument>,
    @InjectModel(CharacterFeats.name) private readonly featsSchema: Model<FeatsDocument>,
    @InjectModel(CharacterMagicItem.name) private readonly magicItemSchema: Model<MagicItemDocument>,
    @InjectModel(CharacterProficiency.name) private readonly proficiencySchema: Model<ProficiencyDocument>,
    @InjectModel(CharacterSpell.name) private readonly spellSchema: Model<SpellDocument>,
  ) { }

  async populate(objectsToSave: object[], schemaName: string) {
    switch (schemaName) {
      case FeatureToSchemaEnum.ALIGNMENT:
        await this.alignmentsSchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.CLASSE:
        await this.classSchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.FEATURE:
        await this.featureSchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.FEATS:
        await this.featsSchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.MAGICITEM:
        await this.magicItemSchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.PROFICIENCY:
        await this.proficiencySchema.create(objectsToSave);
        break;
      case FeatureToSchemaEnum.SPELLS:
        await this.spellSchema.create(objectsToSave);
        break;
      default:
        throw new InternalServerErrorException('Unknow schema');
    }
  }

  async flushAll(): Promise<void> {
    await this.alignmentsSchema.deleteMany({});
    await this.classSchema.deleteMany({});
    await this.featureSchema.deleteMany({});
    await this.featsSchema.deleteMany({});
    await this.magicItemSchema.deleteMany({});
    await this.proficiencySchema.deleteMany({});
    await this.spellSchema.deleteMany({});
  }

}

export default PopulateRepository;