import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CharacterAlignments {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    desc: string;
}

export type AlignmentsDocument = HydratedDocument<CharacterAlignments>;
export const AlignmentsSchema = SchemaFactory.createForClass(CharacterAlignments);