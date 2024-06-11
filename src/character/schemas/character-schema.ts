import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Character {

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    name: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    classes: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    features: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    feats: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    alignments: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    proficiencies: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    spells: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    magicItem: string;

  @Prop({
    minlength: 3,
    required: [true, 'is a required field'],
    trim: true
  })
    charLevel: number;

}

export type CharacterDocument = HydratedDocument<Character>;
export const CharacterSchema = SchemaFactory.createForClass(Character);