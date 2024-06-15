import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class EquipmentCategory {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    url: string;
}

export const EquipmentCategorySchema = SchemaFactory.createForClass(EquipmentCategory);

@Schema()
export class Rarity {
  @Prop()
    name: string;
}

export const RaritySchema = SchemaFactory.createForClass(Rarity);

@Schema()
export class CharacterMagicItem extends Document {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop({ type: EquipmentCategorySchema, required: true })
    equipment_category: EquipmentCategory;

  @Prop({ type: RaritySchema, required: true })
    rarity: Rarity;

  @Prop({ type: SchemaTypes.Mixed })
    variants: any[];

  @Prop()
    variant: boolean;

  @Prop({ type: [String], required: true })
    desc: string[];

  @Prop()
    url: string;
}

export type MagicItemDocument = HydratedDocument<CharacterMagicItem>
export const MagicItemSchema = SchemaFactory.createForClass(CharacterMagicItem);