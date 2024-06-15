import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class Class {
  @Prop({ required: true })
    index: string;

  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    url: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

@Schema()
export class CharacterFeature extends Document {
  @Prop({ required: true })
    index: string;

  @Prop({ type: ClassSchema, required: true })
    class: Class;

  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    level: number;

  @Prop({ type: [SchemaTypes.Mixed], default: [] })
    prerequisites: any[];

  @Prop({ type: [String], required: true })
    desc: string[];

  @Prop({ required: true })
    url: string;
}

export type FeatureDocument = HydratedDocument<CharacterFeature>;
export const FeatureSchema = SchemaFactory.createForClass(CharacterFeature);