import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async getProducts(productName: string, page: number = 1, limit: number = 5) {
        const total = await this.productModel.countDocuments({
            $or: [
                { isDelete: { $ne: true } },
                { isDelete: { $exists: false } },
            ],
        });
        const skip = (page - 1) * limit;
        const filter = {
            $or: [
                { isDelete: { $ne: true } },
                { isDelete: { $exists: false } },
            ],
            ...(productName && { name: { $regex: productName, $options: 'i' } }),
        };
        const products = await this.productModel.find(filter).skip(skip).limit(limit).select('-isDelete').exec();
        const totalFind = await this.productModel.countDocuments(filter);
        const totalPages = Math.ceil(totalFind / limit);
        return {
            products,
            totalPages,
            totalProducts: total,
        };
    }

    async createProduct(dto: CreateProductDto) {
        const products = await this.productModel.find({}).exec();
        const ids = products.map(product => Number(product.id));
        const maxId = Math.max(...ids);
        const newId = !isNaN(maxId) ? maxId + 1 : 1;
        const product = await this.productModel.create({ id: newId.toString(), ...dto });
        return product;
    }

    async updateProduct(id: string, dto: Partial<CreateProductDto>) {
        const updatedProduct = await this.productModel.findOneAndUpdate(
            { id },
            { $set: dto },
            { new: true }
        );
        if (!updatedProduct) {
            throw new NotFoundException(`Product not found`);
        }
        return updatedProduct;
    }

    async deleteProduct(id: string) {
        const product = await this.productModel.findOneAndUpdate(
            { id },
            { isDelete: true },
            { new: true },
        );
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
}
