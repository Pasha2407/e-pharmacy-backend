import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
    @Prop()
    photo: string;

    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    products: string;

    @Prop()
    price: string;

    @Prop()
    status: string;

    @Prop()
    order_date: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
