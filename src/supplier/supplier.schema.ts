import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ versionKey: false })
export class Supplier {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    suppliers: string;

    @Prop()
    date: string;

    @Prop()
    amount: string;

    @Prop()
    status: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
