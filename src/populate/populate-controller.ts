import { Controller, Get } from '@nestjs/common';
import PopulateService from './populate-service';

@Controller('/populate')
class PopulateController {
  constructor(private readonly populateService: PopulateService) {  }

  @Get()
  async populateDatabase() {
    const result = await this.populateService.resetDatabase();
    return result;
  }

}

export default PopulateController;