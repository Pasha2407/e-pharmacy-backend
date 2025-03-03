import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name should not be empty' })
    readonly name: string;

    @IsString({ message: 'Category must be a string' })
    @IsNotEmpty({ message: 'Category should not be empty' })
    readonly category: string;

    @IsString({ message: 'Stock must be a string' })
    @IsNotEmpty({ message: 'Stock should not be empty' })
    readonly stock: string;

    @IsString({ message: 'Suppliers must be a string' })
    @IsNotEmpty({ message: 'Suppliers should not be empty' })
    readonly suppliers: string;

    @IsString({ message: 'Price must be a string' })
    @IsNotEmpty({ message: 'Price should not be empty' })
    readonly price: string;
}