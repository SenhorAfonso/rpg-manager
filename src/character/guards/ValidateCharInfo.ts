import { BadRequestException, CanActivate, ExecutionContext } from '@nestjs/common';

class ValidateCharInfo implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (Object.keys(body).length < 8) {
      throw new BadRequestException(`Missing character attributes ${Object.keys(body).length}/8!`);
    }

    const fetchPomises = Object.entries(body).map(async ([attribute, value]) => {
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
    body.charLevel = 1;
    return true;
  }
}

export default ValidateCharInfo;