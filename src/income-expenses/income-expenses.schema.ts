import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncomeExpensesDocument = IncomeExpenses & Document;

@Schema({ versionKey: false, collection: 'income-expenses' })
export class IncomeExpenses extends Document {
    @Prop()
    name: string;

    @Prop()
    amount: string;

    @Prop()
    type: string;
}

export const IncomeExpensesSchema = SchemaFactory.createForClass(IncomeExpenses);
