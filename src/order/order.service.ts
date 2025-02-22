import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async getOrders(name: string, page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;
        const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const orders = await this.orderModel.find(filter).skip(skip).limit(limit).exec();
        const total = await this.orderModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        return {
            orders,
            currentPage: page,
            totalPages,
            totalOrders: total
        };
    }
}
