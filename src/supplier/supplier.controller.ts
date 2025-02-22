import { Controller, Get, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
    constructor(private readonly orderService: SupplierService) { }

    @Get()
    async getSuppliers(@Query('name') name: string,) {
        return this.orderService.getSuppliers(name);
    }
}
