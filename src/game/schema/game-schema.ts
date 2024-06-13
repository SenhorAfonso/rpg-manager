/* eslint-disable max-classes-per-file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Context {
  @Prop()
    role: 'user' | 'model';

  @Prop()
    parts: Array<string>;
}

@Schema()
export class Game {
  @Prop()
    game: string;

  @Prop({ type: [Context], name: 'context' })
    context: Context[];
};

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);