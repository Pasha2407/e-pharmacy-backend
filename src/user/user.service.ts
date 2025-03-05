import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto);
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async updateUser(userId: string, updateData: Partial<User>) {
        const user = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        return this.userModel.findOne({ googleId }).exec();
    }

    async createOAuthUser(userData: { googleId: string; email: string; }): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
}
