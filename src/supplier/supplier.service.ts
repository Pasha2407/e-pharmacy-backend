import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './supplier.schema';

@Injectable()
export class SupplierService {
    constructor(@InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>) { }

    async getSuppliers(name: string) {
        const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
        const suppliers = await this.supplierModel.find(filter).exec();
        return { suppliers };
    }
}
