import { CharacterDocument } from 'src/character/schemas/character-schema';
import { GameDocument } from '../schema/game-schema';

interface playAdventureType {
  game: GameDocument,
  playersSheets: CharacterDocument[],
  action: Record<string, string>,
  firstRound: boolean
};

export default playAdventureType;