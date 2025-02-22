import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts(
        @Query('name') name: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.productService.getProducts(name, Number(page), Number(limit));
    }
}
