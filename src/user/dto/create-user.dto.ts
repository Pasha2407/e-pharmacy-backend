import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsEmail({}, { message: "Email is incorrect" })
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    readonly email: string;

    @Length(4, 16, { message: 'Password must be at least 4 and no more than 16' })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password should not be empty' })
    readonly password: string;
}