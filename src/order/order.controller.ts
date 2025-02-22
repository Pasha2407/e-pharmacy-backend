import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async getOrders(
        @Query('name') name: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.orderService.getOrders(name, Number(page), Number(limit));
    }
}
