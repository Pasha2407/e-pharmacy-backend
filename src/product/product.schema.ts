import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    suppliers: string;

    @Prop({ required: true })
    stock: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
