import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

class Item extends Document {
  @Prop({ })
    index: string;

  @Prop({ })
    name: string;

  @Prop({ })
    url: string;
}

const ItemSchema = SchemaFactory.createForClass(Item);

class Option extends Document {
  @Prop({ })
    option_type: string;

  @Prop({ type: ItemSchema, })
    item: Item;
}

const OptionSchema = SchemaFactory.createForClass(Option);

class From extends Document {
  @Prop({ })
    option_set_type: string;

  @Prop({ type: [OptionSchema], })
    options: Option[];
}

const FromSchema = SchemaFactory.createForClass(From);

class ProficiencyChoice extends Document {
  @Prop({ })
    desc: string;

  @Prop({ })
    choose: number;

  @Prop({ })
    type: string;

  @Prop({ type: FromSchema, })
    from: From;
}

const ProficiencyChoiceSchema = SchemaFactory.createForClass(ProficiencyChoice);

class Proficiency extends Document {
  @Prop({ })
    index: string;

  @Prop({ })
    name: string;

  @Prop({ })
    url: string;
}
const ProficiencySchema = SchemaFactory.createForClass(Proficiency);

@Schema()
export class CharacterClass extends Document {
  @Prop({ })
    index: string;

  @Prop({ })
    name: string;

  @Prop({ })
    hit_die: number;

  @Prop({ type: [ProficiencyChoiceSchema], })
    proficiency_choices: ProficiencyChoice[];

  @Prop({ type: [ProficiencySchema], })
    proficiencies: Proficiency[];
}

export type ClassDocument = HydratedDocument<CharacterClass>
export const CharacterClassSchema = SchemaFactory.createForClass(CharacterClass);