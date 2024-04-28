import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;
    
    @Prop() // Agrega este decorador para el campo hashedRt
    hashedRt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);