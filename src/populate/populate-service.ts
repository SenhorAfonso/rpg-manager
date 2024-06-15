import { Injectable } from '@nestjs/common';
import PopulateRepository from './populate-repository';
import FeatureToSchemaEnum from './enums/CharacterFeatures-enum';

@Injectable()
class PopulateService {
  private UrlSchemaMap: Map<string, string>;
  constructor(private readonly populateRepository: PopulateRepository) {
    this.UrlSchemaMap = new Map();
    this.UrlSchemaMap.set('/api/alignments', FeatureToSchemaEnum.ALIGNMENT);
    this.UrlSchemaMap.set('/api/classes', FeatureToSchemaEnum.CLASSE);
    this.UrlSchemaMap.set('/api/features', FeatureToSchemaEnum.FEATURE);
    this.UrlSchemaMap.set('/api/feats', FeatureToSchemaEnum.FEATS);
    this.UrlSchemaMap.set('/api/magic-items', FeatureToSchemaEnum.MAGICITEM);
    this.UrlSchemaMap.set('/api/proficiencies', FeatureToSchemaEnum.PROFICIENCY);
    this.UrlSchemaMap.set('/api/spells', FeatureToSchemaEnum.SPELLS);
    this.UrlSchemaMap.set('/api/monsters', FeatureToSchemaEnum.MONSTERS);
  }

  async resetDatabase(): Promise<string> {
    await this.flushAll();
    await this.populate();
    return 'Database successfully populated!';
  }

  async flushAll(): Promise<void> {
    await this.populateRepository.flushAll();
  }

  async populate(): Promise<void> {
    for (const [url, schema] of this.UrlSchemaMap) {
      const request = await fetch(`https://www.dnd5eapi.co${url}`);
      const requestBody = (await request.json()).results;
      const total = requestBody.length;
      const arrayOfObjectsToSave: any[] = [];

      let counter: number = 1;

      for (const resultObject of requestBody) {
        const objectsToSaveRequest = await fetch(`https://www.dnd5eapi.co${resultObject.url}`);
        const objectsToSave = await objectsToSaveRequest.json();

        arrayOfObjectsToSave.push(objectsToSave);

        console.log(`Saving ${url.replace('/api/', '')}. ${counter}/${total}`);
        counter += 1;
      }

      try {
        await this.populateRepository.populate(arrayOfObjectsToSave, schema);
      } catch {
        return;
      }

    }
  }

}

export default PopulateService;