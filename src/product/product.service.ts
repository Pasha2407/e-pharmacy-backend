import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async getProducts(name: string, page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;
        const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const products = await this.productModel.find(filter).skip(skip).limit(limit).exec();
        const total = await this.productModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        return {
            products,
            currentPage: page,
            totalPages,
            totalOrders: total
        };
    }
}
