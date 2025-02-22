import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { Supplier, SupplierSchema } from './supplier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }]),
  ],
  providers: [SupplierService],
  controllers: [SupplierController]
})
export class SupplierModule { }
