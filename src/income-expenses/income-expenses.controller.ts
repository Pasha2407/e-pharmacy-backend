import { Controller, Get } from '@nestjs/common';
import { IncomeExpensesService } from './income-expenses.service';

@Controller('income-expenses')
export class IncomeExpensesController {
    constructor(private readonly incomeExpensesService: IncomeExpensesService) { }

    @Get()
    async getIncomeExpenses() {
        return this.incomeExpensesService.getIncomeExpenses();
    }
}
