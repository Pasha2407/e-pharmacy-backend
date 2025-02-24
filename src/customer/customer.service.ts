import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }

    async getCustomers(userName: string, page: number = 1, limit: number = 5) {
        const skip = (page - 1) * limit;
        const filter = userName ? { name: { $regex: userName, $options: 'i' } } : {};
        const customers = await this.customerModel.find(filter).skip(skip).limit(limit).exec();
        const total = await this.customerModel.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);
        return {
            customers,
            currentPage: page,
            totalPages,
            totalCustomers: total
        };
    }
}
