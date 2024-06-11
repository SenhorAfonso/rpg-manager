import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character-schema';
import CharacterType from './dto/createCharacterDTO';

@Injectable()
class CharacterRepository {

  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) { }

  async createChar(createCharacterDTO: CharacterType) {
    const result = await this.characterModel.create(createCharacterDTO);
    return result;
  }

}

export default CharacterRepository;