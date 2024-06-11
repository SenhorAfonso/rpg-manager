import { CanActivate, ExecutionContext } from "@nestjs/common";
import NotEnoughLevelException from "src/common/errors/NotEnoughLevelException";

class ValidateCharLevel implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { charLevel } = request.body;

    const leveledAttributes = {
      spells: request.body.spells,
      features: request.body.features
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
    request.body.magicItem = request.body['magic-items'];
    delete request.body['magic-items'];
    return true;
  }
}

export default ValidateCharLevel;