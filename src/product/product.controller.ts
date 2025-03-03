import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    createProduct(@Body() productDto: CreateProductDto) {
        return this.productService.createProduct(productDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
        return this.productService.updateProduct(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/delete')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(id);
    }
}
