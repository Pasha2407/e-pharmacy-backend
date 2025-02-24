import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeExpensesService } from './income-expenses.service';
import { IncomeExpensesController } from './income-expenses.controller';
import { IncomeExpenses, IncomeExpensesSchema } from './income-expenses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IncomeExpenses.name, schema: IncomeExpensesSchema }]),
  ],
  providers: [IncomeExpensesService],
  controllers: [IncomeExpensesController]
})
export class IncomeExpensesModule { }
