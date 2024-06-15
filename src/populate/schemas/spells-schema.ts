import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema()
class DamageType {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    url: string;
}

const DamageTypeSchema = SchemaFactory.createForClass(DamageType);

@Schema()
class Damage {
  @Prop({ type: DamageTypeSchema, })
    damage_type: DamageType;

  @Prop({ type: Map, of: String, })
    damage_at_slot_level: Record<string, string>;
}

const DamageSchema = SchemaFactory.createForClass(Damage);

@Schema()
export class CharacterSpell extends Document {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop({ type: [String], })
    desc: string[];

  @Prop({ type: [String], })
    higher_level: string[];

  @Prop()
    range: string;

  @Prop({ type: [String], })
    components: string[];

  @Prop()
    material: string;

  @Prop()
    ritual: boolean;

  @Prop()
    duration: string;

  @Prop()
    concentration: boolean;

  @Prop()
    casting_time: string;

  @Prop()
    level: number;

  @Prop()
    attack_type: string;

  @Prop({ type: DamageSchema, })
    damage: Damage;
}

export type SpellDocument = HydratedDocument<CharacterSpell>;
export const SpellSchema = SchemaFactory.createForClass(CharacterSpell);
