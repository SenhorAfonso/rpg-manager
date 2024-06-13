import { Injectable } from "@nestjs/common";
import CharacterRepository from "./character-repository";
import CharacterType from "./dto/createCharacterDTO";
import DuplicatedContentException from "src/common/errors/DuplicatedContentException";

@Injectable()
class CharacterService {

  constructor(private readonly characterRepository: CharacterRepository) {}

  async createChar(createCharacterDTO: CharacterType) {
    const characterAlreadyExists = await this.characterRepository.findByName(createCharacterDTO.name);

    if (characterAlreadyExists) {
      throw new DuplicatedContentException('Character already exists!');
    }

    const result = await this.characterRepository.createChar(createCharacterDTO);
    return result;
  }

  async help() {
    const result = 'Helps';
    return result;
  }

}

export default CharacterService;