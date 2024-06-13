import { z } from 'zod';

export const startGameValidatorObject = z.object({
  gameName: z.string(),
  players: z.object({
    character1: z.string().min(1, 'An adventure must have at least three characters').trim(),
    character2: z.string().min(1, 'An adventure must have at least three characters').trim(),
    character3: z.string().min(1, 'An adventure must have at least three characters').trim(),
  }),
  action: z.object({
    character1: z.string(),
    character2: z.string(),
    character3: z.string(),
  }),
});

export type startGameType = z.infer<typeof startGameValidatorObject>
export type playerType = {
  character1?: string,
  character2?: string,
  character3?: string,
}