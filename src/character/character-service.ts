import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CharacterAlignments, AlignmentsDocument } from 'src/populate/schemas/alignments-schema';
import { CharacterClass, ClassDocument } from 'src/populate/schemas/classes-schema';
import { CharacterFeats, FeatsDocument } from 'src/populate/schemas/feats-schema';
import { CharacterFeature, FeatureDocument } from 'src/populate/schemas/features-schema';
import { CharacterMagicItem, MagicItemDocument } from 'src/populate/schemas/magic-items-schema';
import { CharacterProficiency, ProficiencyDocument } from 'src/populate/schemas/proficiencies-schema';
import { CharacterSpell, SpellDocument } from 'src/populate/schemas/spells-schema';
import Gemini from 'src/common/getGemini';
import PromptGenerator from 'src/common/PromptGenerator';
import { Either, left, right } from 'src/common/types/either';
import DuplicatedContentException from 'src/common/errors/DuplicatedContentException';
import { CharacterDocument } from './schemas/character-schema';
import CharacterRepository from './character-repository';
import CharacterType from './dto/CreateCharacterDTO';
import getRandomItem from './utils/getRandomItem';

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
    private readonly gemini: Gemini,
    private readonly promptGenerator: PromptGenerator
  ) { }

  async createChar(createCharacterDTO: CharacterType): Promise<Either<DuplicatedContentException, CharacterDocument>> {
    const characterAlreadyExists = await this.characterRepository.findByName(createCharacterDTO.name);

    if (characterAlreadyExists) {
      return left(new DuplicatedContentException('Character already exists!'));
    }

    const result = await this.characterRepository.createChar(createCharacterDTO);
    return right(result);
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

  async createRandomChar(charLevel: number, charName: string) {
    const queryProjection = { index: true, _id: false };

    const spellsList = await this.spellSchema.find({ level: charLevel }, queryProjection);
    const featuresList = await this.featureSchema.find({ level: charLevel }, queryProjection);
    const alignmentsList = await this.alignmentsSchema.find({}, queryProjection);
    const classList = await this.classSchema.find({}, queryProjection);
    const featsList = await this.featsSchema.find({}, queryProjection);
    const magicItemsList = await this.magicItemSchema.find({}, queryProjection);
    const proficienciesList = await this.proficiencySchema.find({}, queryProjection);

    const choosedSpeel = getRandomItem(spellsList).index;
    const choosedFeature = getRandomItem(featuresList).index;
    const choosedAlignment = getRandomItem(alignmentsList).index;
    const choosedClass = getRandomItem(classList).index;
    const choosedFeat = getRandomItem(featsList).index;
    const choosedMagicItem = getRandomItem(magicItemsList).index;
    const choosedProficiency = getRandomItem(proficienciesList).index;

    const characterSheet = {
      name: charName,
      classes: choosedClass,
      features: choosedFeature,
      feats: choosedFeat,
      alignments: choosedAlignment,
      proficiencies: choosedProficiency,
      spells: choosedSpeel,
      magicItem: choosedMagicItem,
      charLevel,
      lore: ''
    };

    const prompt: string = this.promptGenerator.createLore(JSON.stringify(characterSheet));
    characterSheet.lore = await this.gemini.sendGenericPrompt(prompt);

    const createdChar = await this.characterRepository.createChar(characterSheet);

    return createdChar;
  }

}

export default CharacterService;