import { PipeTransform } from '@nestjs/common';
import NotEnoughLevelException from 'src/common/errors/NotEnoughLevelException';
import CreateCharacterDTO from '../dto/CreateCharacterDTO';

class ValidateCharLevel implements PipeTransform {

  async transform(value: CreateCharacterDTO) {
    const { charLevel } = value;

    const leveledAttributes = {
      spells: value.spells,
      features: value.features
    };

    const fetchPromises = Object.entries(leveledAttributes).map(async ([attribute, value]) => {
      const response = await fetch(`https://www.dnd5eapi.co/api/${attribute}/${value}`);
      const responseBody = await response.json();
      const attributeLevel = responseBody.level;

      if (charLevel < attributeLevel) {
        throw new NotEnoughLevelException(`${attribute}`);
      }

    });

    await Promise.all(fetchPromises);
    return {
      ...value,
      magicItem: value['magic-items']
    };
  }
}

export default ValidateCharLevel;