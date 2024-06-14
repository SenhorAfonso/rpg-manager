import { PipeTransform, BadRequestException } from '@nestjs/common';
import CreateCharacterDTO from '../dto/CreateCharacterDTO';

class ValidateCharInfo implements PipeTransform {

  async transform(value: CreateCharacterDTO) {
    const requiredItems: number = 10;
    if (Object.keys(value).length < requiredItems) {
      throw new BadRequestException(`Missing character attributes ${Object.keys(value).length}/${requiredItems}!`);
    }

    const fetchPomises = Object.entries(value).map(async ([attribute, value]) => {
      if (attribute === 'name' || attribute === 'charLevel' || attribute === 'lore') {
        return;
      }
      const response = await fetch(`https://www.dnd5eapi.co/api/${attribute}/${value}`);
      const responseBody = await response.json();
      if (responseBody.error) {
        throw new BadRequestException(`${attribute} not found`);
      }
    });

    await Promise.all(fetchPomises);
    return {
      ...value,
      charLevel: 1
    };
  }

}

export default ValidateCharInfo;