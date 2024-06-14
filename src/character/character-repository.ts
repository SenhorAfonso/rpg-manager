import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from './schemas/character-schema';
import CharacterType from './dto/CreateCharacterDTO';

@Injectable()
class CharacterRepository {

  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) { }

  async createChar(createCharacterDTO: CharacterType): Promise<CharacterDocument> {
    let result: CharacterDocument;

    try {
      result = await this.characterModel.create(createCharacterDTO);
    } catch {
      throw new InternalServerErrorException('An unexpected error occured! Please try again later.');
    }

    return result;
  }

  async findByName(name: string) {
    let result: CharacterDocument;
    try {
      result = await this.characterModel.findOne({ name });
    } catch {
      throw new InternalServerErrorException('An unexpected error occured! Please try again later.');
    }

    return result;
  }

}

export default CharacterRepository;