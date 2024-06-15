import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
class Reference {
  @Prop({ required: true })
    index: string;

  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    url: string;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);

@Schema()
export class CharacterProficiency extends Document {
  @Prop({ required: true })
    index: string;

  @Prop({ required: true })
    type: string;

  @Prop({ required: true })
    name: string;

  @Prop({ type: [SchemaTypes.Mixed], default: [] })
    classes: any[];

  @Prop({ type: [SchemaTypes.Mixed], default: [] })
    races: any[];

  @Prop({ required: true })
    url: string;

  @Prop({ type: ReferenceSchema, required: true })
    reference: Reference;
}

export type ProficiencyDocument = HydratedDocument<CharacterProficiency>
export const ProficiencySchema = SchemaFactory.createForClass(CharacterProficiency);
