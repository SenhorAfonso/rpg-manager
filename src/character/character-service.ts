import { Injectable } from "@nestjs/common";
import CharacterRepository from "./character-repository";
import CharacterType from "./dto/createCharacterDTO";

@Injectable()
class CharacterService {

  constructor(private readonly characterRepository: CharacterRepository) {}

  async createChar(createCharacterDTO: CharacterType) {
    const result = await this.characterRepository.createChar(createCharacterDTO);
    return result;
  }

  async help() {
    return 'help';
  }

}

export default CharacterService;