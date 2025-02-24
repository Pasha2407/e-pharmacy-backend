import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncomeExpenses, IncomeExpensesDocument } from './income-expenses.schema';

@Injectable()
export class IncomeExpensesService {
    constructor(@InjectModel(IncomeExpenses.name) private incomeExpensesModel: Model<IncomeExpensesDocument>) { }

    async getIncomeExpenses(limit: number = 6) {
        const list = await this.incomeExpensesModel.find().limit(limit).exec();
        return { list };
    }
}
