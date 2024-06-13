import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character-schema';
import CharacterType from './dto/createCharacterDTO';

@Injectable()
class CharacterRepository {

  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) { }

  async createChar(createCharacterDTO: CharacterType): Promise<CharacterDocument> {
    const result = await this.characterModel.create(createCharacterDTO);
    return result;
  }

  async findByName(name: string) {
    const result = await this.characterModel.findOne({ name });
    return result;
  }

}

export default CharacterRepository;