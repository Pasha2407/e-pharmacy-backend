import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User extends Document {
    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: false })
    password: string;

    @Prop({ type: String, default: null })
    token: string | null;

    @Prop({ unique: true, sparse: true })
    googleId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
