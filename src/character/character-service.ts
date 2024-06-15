import { Injectable } from '@nestjs/common';
import DuplicatedContentException from 'src/common/errors/DuplicatedContentException';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterAlignments, AlignmentsDocument } from 'src/populate/schemas/alignments-schema';
import { CharacterClass, ClassDocument } from 'src/populate/schemas/classes-schema';
import { CharacterFeats, FeatsDocument } from 'src/populate/schemas/feats-schema';
import { CharacterFeature, FeatureDocument } from 'src/populate/schemas/features-schema';
import { CharacterMagicItem, MagicItemDocument } from 'src/populate/schemas/magic-items-schema';
import { CharacterProficiency, ProficiencyDocument } from 'src/populate/schemas/proficiencies-schema';
import { CharacterSpell, SpellDocument } from 'src/populate/schemas/spells-schema';
import CharacterType from './dto/CreateCharacterDTO';
import CharacterRepository from './character-repository';

@Injectable()
class CharacterService {

  constructor(
    private readonly characterRepository: CharacterRepository,
    @InjectModel(CharacterAlignments.name) private readonly alignmentsSchema: Model<AlignmentsDocument>,
    @InjectModel(CharacterClass.name) private readonly classSchema: Model<ClassDocument>,
    @InjectModel(CharacterFeature.name) private readonly featureSchema: Model<FeatureDocument>,
    @InjectModel(CharacterFeats.name) private readonly featsSchema: Model<FeatsDocument>,
    @InjectModel(CharacterMagicItem.name) private readonly magicItemSchema: Model<MagicItemDocument>,
    @InjectModel(CharacterProficiency.name) private readonly proficiencySchema: Model<ProficiencyDocument>,
    @InjectModel(CharacterSpell.name) private readonly spellSchema: Model<SpellDocument>,
  ) { }

  async createChar(createCharacterDTO: CharacterType) {
    const characterAlreadyExists = await this.characterRepository.findByName(createCharacterDTO.name);

    if (characterAlreadyExists) {
      throw new DuplicatedContentException('Character already exists!');
    }

    const result = await this.characterRepository.createChar(createCharacterDTO);
    return result;
  }

  async help() {
    const querySearch = { index: true, name: true, desc: true, _id: false };

    const alignments = await this.alignmentsSchema.find({}, querySearch);
    const classes = await this.classSchema.find({}, querySearch);
    const features = await this.featureSchema.find({}, querySearch);
    const feats = await this.featsSchema.find({}, querySearch);
    const magicItems = await this.magicItemSchema.find({}, querySearch);
    const proficiencies = await this.proficiencySchema.find({}, querySearch);
    const spells = await this.spellSchema.find({}, querySearch);

    return { alignments, classes, features, feats, magicItems, proficiencies, spells };
  }

}

export default CharacterService;