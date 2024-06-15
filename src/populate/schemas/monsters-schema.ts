import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class ArmorClass {
  @Prop()
    type: string;

  @Prop()
    value: number;
}

const ArmorClassSchema = SchemaFactory.createForClass(ArmorClass);

export class Speed {
  @Prop()
    walk: string;

  @Prop()
    swim: string;
}

const SpeedSchema = SchemaFactory.createForClass(Speed);

export class Proficiency {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    url: string;
}

const ProficiencySchema = SchemaFactory.createForClass(Proficiency);

export class ProficiencyBonus {
  @Prop()
    value: number;

  @Prop({ type: ProficiencySchema, required: true })
    proficiency: Proficiency;
}

const ProficiencyBonusSchema = SchemaFactory.createForClass(ProficiencyBonus);

export class SpecialAbility {
  @Prop()
    name: string;

  @Prop()
    desc: string;
}

const SpecialAbilitySchema = SchemaFactory.createForClass(SpecialAbility);

export class DcType {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    url: string;
}

const DcTypeSchema = SchemaFactory.createForClass(DcType);

export class Dc {
  @Prop({ type: DcTypeSchema, required: true })
    dc_type: DcType;

  @Prop()
    dc_value: number;

  @Prop()
    success_type: string;
}

const DcSchema = SchemaFactory.createForClass(Dc);

export class Action {
  @Prop()
    name: string;

  @Prop()
    desc: string;

  @Prop()
    attack_bonus: number;

  @Prop({ type: DcSchema, required: true })
    dc: Dc;
}

const ActionSchema = SchemaFactory.createForClass(Action);

@Schema()
export class Monster {
  @Prop()
    index: string;

  @Prop()
    name: string;

  @Prop()
    size: string;

  @Prop()
    type: string;

  @Prop()
    alignment: string;

  @Prop({ type: [ArmorClassSchema], required: true })
    armor_class: ArmorClass[];

  @Prop()
    hit_points: number;

  @Prop()
    hit_dice: string;

  @Prop()
    hit_points_roll: string;

  @Prop({ type: SpeedSchema, required: true })
    speed: Speed;

  @Prop()
    strength: number;

  @Prop()
    dexterity: number;

  @Prop()
    constitution: number;

  @Prop()
    intelligence: number;

  @Prop()
    wisdom: number;

  @Prop()
    charisma: number;

  @Prop({ type: [ProficiencyBonusSchema], required: true })
    proficiencies: ProficiencyBonus[];

  @Prop()
    languages: string;

  @Prop()
    challenge_rating: number;

  @Prop()
    proficiency_bonus: number;

  @Prop()
    xp: number;

  @Prop({ type: [SpecialAbilitySchema], required: true })
    special_abilities: SpecialAbility[];

  @Prop({ type: [ActionSchema], required: true })
    actions: Action[];
}

export type MonsterDocument = HydratedDocument<Monster>;
export const MonsterSchema = SchemaFactory.createForClass(Monster);