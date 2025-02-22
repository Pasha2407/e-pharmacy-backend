import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ versionKey: false })
export class Supplier {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    suppliers: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    amount: string;

    @Prop({ required: true })
    status: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
