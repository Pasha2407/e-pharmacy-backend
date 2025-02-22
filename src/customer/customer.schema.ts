import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ versionKey: false })
export class Customer {
    @Prop()
    image: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    spent: string;

    @Prop()
    phone: string;

    @Prop()
    address: string;

    @Prop()
    register_date: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
