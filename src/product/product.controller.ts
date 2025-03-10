import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts(
        @Query('productName') productName: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.productService.getProducts(productName, Number(page), Number(limit));
    }

    @Post()
    createProduct(@Body() productDto: CreateProductDto) {
        return this.productService.createProduct(productDto)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
        if (!dto || Object.keys(dto).length === 0) {
            throw new BadRequestException('The data to update cannot be empty');
        }
        return this.productService.updateProduct(id, dto);
    }

    @Patch(':id/delete')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
