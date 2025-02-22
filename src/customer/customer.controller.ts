import { Controller, Get, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async getOrders(
        @Query('name') name: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.customerService.getCustomers(name, Number(page), Number(limit));
    }
}
