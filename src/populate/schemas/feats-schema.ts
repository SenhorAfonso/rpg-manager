import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
export class AbilityScore {
  @Prop({ required: true })
    index: string;

  @Prop({ required: true })
    name: string;

  @Prop({ required: true })
    url: string;
}

export const AbilityScoreSchema = SchemaFactory.createForClass(AbilityScore);

@Schema()
export class Prerequisite {
  @Prop({ type: AbilityScoreSchema, required: true })
    ability_score: AbilityScore;

  @Prop({ required: true })
    minimum_score: number;
}

export const PrerequisiteSchema = SchemaFactory.createForClass(Prerequisite);

@Schema()
export class CharacterFeats extends Document {
  @Prop({ required: true })
    index: string;

  @Prop({ required: true })
    name: string;

  @Prop({ type: [PrerequisiteSchema], default: [] })
    prerequisites: Prerequisite[];

  @Prop({ type: [String], required: true })
    desc: string[];

  @Prop({ required: true })
    url: string;
}

export type FeatsDocument = HydratedDocument<CharacterFeats>;
export const FeatsSchema = SchemaFactory.createForClass(CharacterFeats);
