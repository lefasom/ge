import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemsDocument = HydratedDocument<Items>;

@Schema()
export class Items {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

}

export const ItemsSchema = SchemaFactory.createForClass(Items);